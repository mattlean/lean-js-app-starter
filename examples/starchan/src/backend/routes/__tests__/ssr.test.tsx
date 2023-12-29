import {
    getQueriesForElement,
    queries,
    render,
    screen as tlScreen,
} from '@testing-library/react'
import globalJsdom from 'global-jsdom'
import { HttpResponse, http } from 'msw'
import request from 'supertest'

import { buildStore } from '../../../frontend/common/redux'
import { TestApp } from '../../../frontend/common/util/test'
import { server } from '../../../frontend/msw/node'
import app from '../../app'
import MOCK_FULL_THREAD_LIST from './MOCK_FULL_THREAD_LIST.json'

let cleanupJsdom: { (): void }

beforeAll(() =>
    server.listen({
        onUnhandledRequest: (req, print) => {
            const url = new URL(req.url)

            if (url.pathname === '/') {
                // Ignore MSW warning when home page is requested
                return
            }

            print.warning()
        },
    })
)

afterEach(() => {
    server.resetHandlers()
    cleanupJsdom()
})

afterAll(() => server.close())

test('matches snapshot for basic server-side rendering of thread list page', async () => {
    expect.assertions(1)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

    const rootEl = window.document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    const store = buildStore(window.__PRELOADED_STATE__)

    const { asFragment } = render(
        <TestApp initialEntries={['/']} store={store} />,
        { container: rootEl, hydrate: true }
    )

    expect(asFragment()).toMatchSnapshot()
})

test('server-side renders and hydrates empty thread list page', async () => {
    expect.assertions(1)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    // When imported directly from Testing Library, screen cannot find
    // document.body from global-jsdom for some reason, so this is a workaround.
    const screen = getQueriesForElement(document.body, queries)

    const rootEl = window.document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    const store = buildStore(window.__PRELOADED_STATE__)

    render(<TestApp initialEntries={['/']} store={store} />, {
        container: rootEl,
        hydrate: true,
    })

    expect(
        screen.queryByText(
            /Currently no threads exist. Why don't you create the first one?/i
        )
    ).toBeInTheDocument()
})

test('server-side renders and hydrates thread list page with one page', async () => {
    const MOCK_THREAD_LIST = MOCK_FULL_THREAD_LIST.slice(0, 5)

    server.use(
        http.get('http://localhost:3000/api/v1/threads?page=1', () =>
            HttpResponse.json({
                data: MOCK_THREAD_LIST,
                info: {
                    hasNextPage: false,
                    hasPreviousPage: false,
                    totalPages: 1,
                },
            })
        )
    )

    expect.assertions(2)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    // When imported directly from Testing Library, screen cannot find
    // document.body from global-jsdom for some reason, so this is a workaround.
    const screen = getQueriesForElement(document.body, queries)

    const rootEl = window.document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    const store = buildStore(window.__PRELOADED_STATE__)

    render(<TestApp initialEntries={['/']} store={store} />, {
        container: rootEl,
        hydrate: true,
    })

    // Confirm that the current thread page only shows 5 threads
    expect(screen.getAllByRole('list')[0].children).toHaveLength(5)
    // Confirm that the page navigation only shows 1 page
    expect(screen.getByRole('navigation').children[0].children).toHaveLength(1)
})

test('server-side renders and hydrates thread list page with multiple pages', async () => {
    const MOCK_THREAD_LIST = MOCK_FULL_THREAD_LIST.slice(0, 20)

    server.use(
        http.get('http://localhost:3000/api/v1/threads?page=1', () =>
            HttpResponse.json({
                data: MOCK_THREAD_LIST,
                info: {
                    hasNextPage: true,
                    hasPreviousPage: false,
                    totalPages: 3,
                },
            })
        )
    )

    expect.assertions(2)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    // When imported directly from Testing Library, screen cannot find
    // document.body from global-jsdom for some reason, so this is a workaround.
    const screen = getQueriesForElement(document.body, queries)

    const rootEl = window.document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    const store = buildStore(window.__PRELOADED_STATE__)

    render(<TestApp initialEntries={['/']} store={store} />, {
        container: rootEl,
        hydrate: true,
    })

    // Confirm that the current thread page shows the maximum of 20 threads
    expect(screen.getAllByRole('list')[0].children).toHaveLength(20)
    // Confirm that the page navigation shows 3 pages
    expect(screen.getByRole('navigation').children[0].children).toHaveLength(3)
})
