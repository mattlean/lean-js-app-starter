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
import { MOCK_THREAD_W_COMMENT } from './MOCK_DATA'
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
const MOCK_THREAD_LIST_INFO = {
    hasNextPage: true,
    hasPreviousPage: false,
    totalPages: 3,
}

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
    const MOCK_THREAD_LIST_RESULT = MOCK_THREAD_LIST_RES.slice(0, 5)

    server.use(
        http.get('http://localhost:3000/api/v1/threads', () =>
            HttpResponse.json({
                data: MOCK_THREAD_LIST_RESULT,
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
    expect(screen.getByTestId('page-select').children).toHaveLength(1)
})

test('hydrates thread list page with multiple pages', async () => {
    server.use(
        http.get('http://localhost:3000/api/v1/threads', () =>
            HttpResponse.json({
                data: MOCK_THREAD_LIST_RESULTS_P1,
                info: MOCK_THREAD_LIST_INFO,
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
    expect(screen.getByTestId('page-select').children).toHaveLength(3)
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
                    info: MOCK_THREAD_LIST_INFO,
                })
            } else if (page === '2') {
                return HttpResponse.json({
                    data: MOCK_THREAD_LIST_RESULTS_P2,
                    info: MOCK_THREAD_LIST_INFO,
                })
            }

            throw new Error('Unsupported mocked page number was requested')
        })
    )

    expect.assertions(4)

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    window.scrollTo = jest.fn() // Mock scrollTo since jsdom does not implement it

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

    // First thread from page 1 should be visible, but first thread from page 2 shouldn't
    expect(
        screen.getByText(MOCK_THREAD_LIST_RESULTS_P1[0].subject)
    ).toBeInTheDocument()
    expect(
        screen.queryByText(MOCK_THREAD_LIST_RESULTS_P2[0].subject)
    ).not.toBeInTheDocument()

    // user-event currently has an issue running in the SSR environment,
    // so fireEvent is used instead
    await fireEvent.click(screen.getByRole('link', { name: '2' }))
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

    // First thread from page 2 should be visible, but first thread from page 1 shouldn't
    expect(
        screen.getByText(MOCK_THREAD_LIST_RESULTS_P2[0].subject)
    ).toBeInTheDocument()
    expect(
        screen.queryByText(MOCK_THREAD_LIST_RESULTS_P1[0].subject)
    ).not.toBeInTheDocument()
})

test('creates new thread with comment when new thread form only has comment', async () => {
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

    // user-event currently has an issue running in the SSR environment,
    // so fireEvent is used instead
    await fireEvent.click(
        screen.getByRole('button', { name: /start a new thread/i })
    )

    // Wait for the new thread form to appear
    const inputComment = (await screen.findByLabelText(
        'Comment'
    )) as HTMLInputElement

    fireEvent.change(inputComment, {
        target: { value: MOCK_THREAD_W_COMMENT.comment },
    })
    await fireEvent.click(screen.getByRole('button', { name: /post/i }))

    await screen.findByRole('button', { name: /post a reply/i })

    // Confirm that the thread page has been navigated to
    expect(
        screen.getByText(`Id.${MOCK_THREAD_W_COMMENT.id}`)
    ).toBeInTheDocument()
    expect(screen.getByText(MOCK_THREAD_W_COMMENT.comment)).toBeInTheDocument()
})
