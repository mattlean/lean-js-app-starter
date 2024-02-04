import {
    fireEvent,
    getQueriesForElement,
    queries,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import globalJsdom from 'global-jsdom'
import { HttpResponse, http } from 'msw'
import request from 'supertest'

import { buildStore } from '../../../frontend/common/redux'
import { TestApp } from '../../../frontend/common/util/test'
import { server } from '../../../frontend/msw/node'
import app from '../../app'
import MOCK_THREAD_LIST_RES from './MOCK_THREAD_LIST_RES.json'

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

const MOCK_THREAD_LIST_RESULTS_P1 = MOCK_THREAD_LIST_RES.slice(0, 20)
const MOCK_THREAD_LIST_RESULTS_P2 = MOCK_THREAD_LIST_RES.slice(20, 40)

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

test('hydrates empty thread list page', async () => {
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

test('hydrates thread list page with one page', async () => {
    const MOCK_THREAD_LIST = MOCK_THREAD_LIST_RES.slice(0, 5)

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

test('hydrates thread list page with multiple pages', async () => {
    server.use(
        http.get('http://localhost:3000/api/v1/threads?page=1', () =>
            HttpResponse.json({
                data: MOCK_THREAD_LIST_RESULTS_P1,
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

test('thread list page navigates to different page when page select is used', async () => {
    server.use(
        http.get('http://localhost:3000/api/v1/threads', ({ request }) => {
            // Construct a URL instance out of the intercepted request.
            const url = new URL(request.url)
            const page = url.searchParams.get('page')

            if (page === '1') {
                return HttpResponse.json({
                    data: MOCK_THREAD_LIST_RESULTS_P1,
                    info: {
                        hasNextPage: true,
                        hasPreviousPage: false,
                        totalPages: 3,
                    },
                })
            } else if (page === '2') {
                return HttpResponse.json({
                    data: MOCK_THREAD_LIST_RESULTS_P2,
                    info: {
                        hasNextPage: true,
                        hasPreviousPage: true,
                        totalPages: 3,
                    },
                })
            }

            throw new Error('Unsupported mocked page number was requested')
        })
    )

    expect.assertions(4)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    window.scrollTo = jest.fn() // Mock scrollTo since global-jsdom does not implement it (TODO: test if regular jsdom does)
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

    // TODO: remove this if unneeded
    // const mockedScrollTo = window.scrollTo as jest.Mock<void>

    // Generated thread 1 is on page 1 so it should be visible
    expect(
        screen.getByText(/Generated thread 1 \(laboris\)/i)
    ).toBeInTheDocument()
    expect(
        screen.queryByText(/Generated thread 21 \(ad\)/i)
    ).not.toBeInTheDocument()

    await fireEvent.click(screen.getByRole('link', { name: '2' }))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    // Generated thread 21 is on page 2 so it should be visible
    expect(
        screen.queryByText(/Generated thread 1 \(laboris\)/i)
    ).not.toBeInTheDocument()
    expect(screen.getByText(/Generated thread 21 \(ad\)/i)).toBeInTheDocument()
})
