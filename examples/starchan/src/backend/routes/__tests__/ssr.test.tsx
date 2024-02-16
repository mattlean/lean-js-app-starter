import {
    fireEvent,
    getQueriesForElement,
    queries,
    render,
    waitForElementToBeRemoved,
} from '@testing-library/react'
import globalJsdom from 'global-jsdom'
import { HttpResponse, http } from 'msw'
import { act } from 'react-dom/test-utils'
import request from 'supertest'

import { buildStore } from '../../../frontend/common/redux'
import { TestApp } from '../../../frontend/common/util/test'
import { setSubject } from '../../../frontend/features/formInputs/formInputsSlice'
import { server } from '../../../frontend/msw/node'
import app from '../../app'
import { prismaMock } from '../../common/util/test'
import {
    MOCK_REPLY,
    MOCK_THREAD_INCLUDES_REPLY,
    MOCK_THREAD_W_COMMENT,
    MOCK_THREAD_W_REPLY,
    MOCK_THREAD_W_SUBJECT_COMMENT,
} from './MOCK_DATA'
import MOCK_THREAD_LIST_RES from './MOCK_THREAD_LIST_RES.json'

let cleanupJsdom: { (): void }

beforeAll(() =>
    server.listen({
        onUnhandledRequest: (req, print) => {
            const url = new URL(req.url)

            if (
                ((req.method === 'GET' || req.method === 'POST') &&
                    url.pathname === '/') ||
                (req.method === 'GET' && url.pathname === '/2') ||
                (req.method === 'GET' &&
                    url.pathname === `/thread/${MOCK_THREAD_W_COMMENT.id}`) ||
                (req.method === 'GET' &&
                    url.pathname ===
                        `/thread/${MOCK_THREAD_W_SUBJECT_COMMENT.id}`) ||
                ((req.method === 'GET' || req.method === 'POST') &&
                    url.pathname === `/thread/${MOCK_THREAD_W_REPLY.id}`)
            ) {
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

describe('thread list page', () => {
    it('matches snapshot for basic server-side rendering', async () => {
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

    it('hydrates when no threads exist', async () => {
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

        // Confirm that the empty thread list message is present
        expect(
            screen.queryByText(
                /Currently no threads exist. Why don't you create the first one?/i
            )
        ).toBeInTheDocument()
    })

    it('hydrates when only one page exists', async () => {
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
        expect(screen.getByTestId('thread-list').children).toHaveLength(5)
        // Confirm that the page navigation only shows 1 page
        expect(screen.getByTestId('page-select').children).toHaveLength(1)
    })

    it('has the correct document title for the first page', async () => {
        expect.assertions(2)

        const THREAD_PAGE_TITLE = 'ljas-starchan'

        const res = await request(app).get('/')

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // Expect the correct title for the first page on the thread list in the SSR
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={['/']} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Expect that the correct title is maintained after hydration
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)
    })

    it('hydrates when there are multiple pages', async () => {
        server.use(
            http.get('http://localhost:3000/api/v1/threads', () =>
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
        expect(screen.getByTestId('thread-list').children).toHaveLength(20)
        // Confirm that the page navigation shows 3 pages
        expect(screen.getByTestId('page-select').children).toHaveLength(3)
    })

    it('navigates to different page when page select is used', async () => {
        server.use(
            http.get('http://localhost:3000/api/v1/threads', ({ request }) => {
                // Construct a URL instance out of the intercepted request
                const url = new URL(request.url)
                const page = url.searchParams.get('page')

                if (page === '1') {
                    return HttpResponse.json({
                        data: MOCK_THREAD_LIST_RESULTS_P1,
                        info: {
                            hasNextPage: true,
                            hasPreviousPage: false,
                            totalPages: 2,
                        },
                    })
                } else if (page === '2') {
                    return HttpResponse.json({
                        data: MOCK_THREAD_LIST_RESULTS_P2,
                        info: {
                            hasNextPage: false,
                            hasPreviousPage: true,
                            totalPages: 2,
                        },
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
        fireEvent.click(screen.getByRole('link', { name: '2' }))

        await waitForElementToBeRemoved(() => screen.getByText(/loading.../i))

        // First thread from page 2 should be visible, but first thread from page 1 shouldn't
        expect(
            screen.getByText(MOCK_THREAD_LIST_RESULTS_P2[0].subject)
        ).toBeInTheDocument()
        expect(
            screen.queryByText(MOCK_THREAD_LIST_RESULTS_P1[0].subject)
        ).not.toBeInTheDocument()
    })

    it('hydrates a page after the first page', async () => {
        server.use(
            http.get('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_LIST_RESULTS_P2,
                    info: {
                        hasNextPage: false,
                        hasPreviousPage: true,
                        totalPages: 2,
                    },
                })
            )
        )

        expect.assertions(1)

        const res = await request(app).get('/2')

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={['/2']} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Expect page 2 to be visible
        expect(
            screen.getByText(MOCK_THREAD_LIST_RESULTS_P2[0].subject)
        ).toBeInTheDocument()
    })

    it('has the correct document title after the first page', async () => {
        expect.assertions(2)

        const THREAD_LIST_TITLE = 'Thread List Page 2 - ljas-starchan'

        const res = await request(app).get('/2')

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // Expect the correct title for the first page on the thread list in the SSR
        expect(window.document.title).toBe(THREAD_LIST_TITLE)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={['/2']} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Expect that the correct title is maintained after hydration
        expect(window.document.title).toBe(THREAD_LIST_TITLE)
    })

    it('does not show omitted reply count when the thread has less than 6 replies', async () => {
        const MOCK_THREAD = MOCK_THREAD_LIST_RES.find((t) => t.replyCount < 6)

        if (!MOCK_THREAD) {
            throw new Error(
                'No thread with less than 6 replies was found in mock data.'
            )
        }

        server.use(
            http.get('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json({
                    data: [MOCK_THREAD],
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

        // Confirm that the thread exists without the omitted reply count text
        expect(screen.queryByText(MOCK_THREAD.comment)).toBeInTheDocument()
        expect(screen.queryByText(/omitted/i)).not.toBeInTheDocument()
    })

    it('does show omitted reply count when the thread has more than 5 replies', async () => {
        const MOCK_THREAD = MOCK_THREAD_LIST_RES.find((t) => t.replyCount > 5)

        if (!MOCK_THREAD) {
            throw new Error(
                'No thread with less than 6 replies was found in mock data.'
            )
        }

        server.use(
            http.get('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json({
                    data: [MOCK_THREAD],
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

        // Confirm that the thread exists with the omitted reply count text
        expect(screen.queryByText(MOCK_THREAD.comment)).toBeInTheDocument()
        expect(screen.queryByText(/omitted/i)).toBeInTheDocument()
    })

    it('creates new thread with comment when new thread form only has comment', async () => {
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
        fireEvent.click(
            screen.getByRole('button', { name: /start a new thread/i })
        )

        // Wait for the new thread form to appear
        const inputComment = await screen.findByLabelText('Comment')

        fireEvent.change(inputComment, {
            target: { value: MOCK_THREAD_W_COMMENT.comment },
        })
        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for "Post a Reply" button to appear
        await screen.findByRole('button', { name: /post a reply/i })

        // Confirm that the thread page has been navigated to
        expect(
            screen.getByText(`Id.${MOCK_THREAD_W_COMMENT.id}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_COMMENT.comment)
        ).toBeInTheDocument()
    })

    it('creates new thread with subject & comment when new thread form has subject & comment', async () => {
        server.use(
            http.post('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_W_SUBJECT_COMMENT,
                })
            ),

            http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_W_SUBJECT_COMMENT,
                })
            )
        )

        expect.assertions(3)

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
        fireEvent.click(
            screen.getByRole('button', { name: /start a new thread/i })
        )

        // Wait for the new thread form to appear
        const inputSubject = await screen.findByLabelText('Subject')

        fireEvent.change(inputSubject, {
            target: { value: MOCK_THREAD_W_SUBJECT_COMMENT.subject },
        })
        fireEvent.change(screen.getByLabelText('Comment'), {
            target: { value: MOCK_THREAD_W_SUBJECT_COMMENT.comment },
        })
        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for "Post a Reply" button to appear
        await screen.findByRole('button', { name: /post a reply/i })

        // Confirm that the thread page has been navigated to
        expect(
            screen.getByText(`Id.${MOCK_THREAD_W_SUBJECT_COMMENT.id}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_SUBJECT_COMMENT.subject as string)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_SUBJECT_COMMENT.comment)
        ).toBeInTheDocument()
    })

    it('creates new thread with comment when new thread form only has comment while JavaScript is disabled', async () => {
        prismaMock.thread.create.mockResolvedValue(MOCK_THREAD_W_COMMENT)
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prismaMock.thread.aggregate.mockResolvedValue({ _count: 1 })

        expect.assertions(3)

        // Because we're simulating browsing with JS-disabled, subject will always be sent
        // as empty string when nothing is typed
        const res = await request(app)
            .post('/')
            .send({ subject: '', comment: MOCK_THREAD_W_COMMENT.comment })
            .redirects(1)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        // Make sure no validation errors were encountered on the server
        expect(store.getState().formError).toBe('')

        render(
            <TestApp
                initialEntries={[`/thread/${MOCK_THREAD_W_COMMENT.id}`]}
                store={store}
            />,
            {
                container: rootEl,
                hydrate: true,
            }
        )

        // Confirm that the thread page has been navigated to
        expect(
            screen.getByText(`Id.${MOCK_THREAD_W_COMMENT.id}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_COMMENT.comment)
        ).toBeInTheDocument()
    })

    it('displays error message when there is an attempt to create a new thread without a comment', async () => {
        server.use(
            http.post('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json(
                    {
                        errors: [
                            {
                                type: 'field',
                                value: '',
                                msg: 'Invalid value',
                                path: 'comment',
                                location: 'body',
                            },
                        ],
                    },
                    { status: 400 }
                )
            )
        )

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

        // user-event currently has an issue running in the SSR environment,
        // so fireEvent is used instead
        fireEvent.click(
            screen.getByRole('button', { name: /start a new thread/i })
        )

        // Wait for the new thread form to appear
        await screen.findByLabelText('Comment')

        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for error to appear
        await screen.findByText(/the following fields are invalid: comment/i)

        // Confirm that the user is still on the thread list
        expect(
            screen.queryByText(
                /currently no threads exist. why don't you create the first one?/i
            )
        ).toBeInTheDocument()
    })

    it('displays error message when there is an attempt to create a new thread without a comment while JavaScript is disabled', async () => {
        expect.assertions(1)

        // Because we're simulating browsing with JS-disabled, subject & comment will always be sent
        // as empty string when nothing is typed
        const res = await request(app)
            .post('/')
            .send({ subject: '', comment: '' })

        // Because this test simulates a case where the user is browsing with JS-disabled,
        // we do not need to render the frontend of the app as it will render an impossible case.
        // We only need the jsdom to get the preloaded state generated by the server.
        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        const store = buildStore(window.__PRELOADED_STATE__)

        // Expect formError Redux state to have the correct error
        expect(store.getState().formError).toBe(
            'The following fields are invalid: comment'
        )
    })

    it('persists form values when there is an attempt to create a new thread without a comment', async () => {
        server.use(
            http.post('http://localhost:3000/api/v1/threads', () =>
                HttpResponse.json(
                    {
                        errors: [
                            {
                                type: 'field',
                                value: '',
                                msg: 'Invalid value',
                                path: 'comment',
                                location: 'body',
                            },
                        ],
                    },
                    { status: 400 }
                )
            )
        )

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

        // user-event currently has an issue running in the SSR environment,
        // so fireEvent is used instead
        fireEvent.click(
            screen.getByRole('button', { name: /start a new thread/i })
        )

        // Wait for the new thread form to appear
        let inputSubject = await screen.findByLabelText<HTMLInputElement>(
            'Subject'
        )

        fireEvent.change(inputSubject, {
            target: { value: MOCK_THREAD_W_SUBJECT_COMMENT.subject },
        })
        act(() => {
            // Not super sure why this is needed, but I hypothesize that fireEvent
            // doesn't trigger the input onChange handler so I have to dispatch
            // setSubject here. Might be fixed with user-event, but due to the
            // that cannot be used at the moment peculiarities of the SSR
            // testing environment.
            store.dispatch(
                setSubject(MOCK_THREAD_W_SUBJECT_COMMENT.subject as string)
            )
        })
        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for error to appear
        await screen.findByText(/the following fields are invalid: comment/i)

        inputSubject = screen.getByLabelText<HTMLInputElement>('Subject')

        // Expect subject input is persisted
        expect(inputSubject).toHaveValue(MOCK_THREAD_W_SUBJECT_COMMENT.subject)
    })

    it('persists form values when there is an attempt to create a new thread without a comment while JavaScript is disabled', async () => {
        expect.assertions(3)

        const TXT_SUBJECT = 'foo'
        const TXT_COMMENT = ''

        // Because we're simulating browsing with JS-disabled, subject & comment will always be sent
        // as empty string when nothing is typed
        const res = await request(app)
            .post('/')
            .send({ subject: TXT_SUBJECT, comment: TXT_COMMENT })

        // Because this test simulates a case where the user is browsing with JS-disabled,
        // we do not need to render the frontend of the app as it will render an impossible case.
        // We only need the jsdom to get the preloaded state generated by the server.
        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        const store = buildStore(window.__PRELOADED_STATE__)

        // Expect formError Redux state to have the correct error
        expect(store.getState().formError).toBe(
            'The following fields are invalid: comment'
        )

        // Expect server-side rendering to persist form inputs
        expect(store.getState().formInputs.subject).toBe(TXT_SUBJECT)
        expect(store.getState().formInputs.comment).toBe(TXT_COMMENT)
    })
})

describe('thread page', () => {
    it('matches snapshot for basic server-side rendering', async () => {
        expect.assertions(1)

        const currPath = `/thread/${MOCK_THREAD_W_COMMENT.id}`

        const res = await request(app).get(currPath)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        const { asFragment } = render(
            <TestApp initialEntries={[currPath]} store={store} />,
            { container: rootEl, hydrate: true }
        )

        expect(asFragment()).toMatchSnapshot()
    })

    it('hydrates', async () => {
        expect.assertions(2)

        const currPath = `/thread/${MOCK_THREAD_W_COMMENT.id}`

        const res = await request(app).get(currPath)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Confirm the correct thread content is present
        expect(
            screen.getByText(`Id.${MOCK_THREAD_W_COMMENT.id}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_COMMENT.comment)
        ).toBeInTheDocument()
    })

    it('has the correct document title when the thread has no subject', async () => {
        expect.assertions(2)

        const THREAD_PAGE_TITLE = `Thread ${MOCK_THREAD_W_COMMENT.id} - ljas-starchan`

        const currPath = `/thread/${MOCK_THREAD_W_COMMENT.id}`

        const res = await request(app).get(currPath)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // Expect the correct title for the first page on the thread list in the SSR
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Expect that the correct title is maintained after hydration
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)
    })

    it('has the correct document title when the thread has subject', async () => {
        server.use(
            http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_W_SUBJECT_COMMENT,
                })
            )
        )

        expect.assertions(2)

        const THREAD_PAGE_TITLE = `${MOCK_THREAD_W_SUBJECT_COMMENT.subject} - ljas-starchan`

        const currPath = `/thread/${MOCK_THREAD_W_SUBJECT_COMMENT.id}`

        const res = await request(app).get(currPath)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // Expect the correct title for the first page on the thread list in the SSR
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Expect that the correct title is maintained after hydration
        expect(window.document.title).toBe(THREAD_PAGE_TITLE)
    })

    it('creates new reply with new reply form', async () => {
        server.use(
            http.get(
                'http://localhost:3000/api/v1/threads/:threadId',
                () =>
                    HttpResponse.json({
                        data: MOCK_THREAD_W_REPLY,
                    }),
                { once: true }
            ),

            http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_INCLUDES_REPLY,
                })
            )
        )

        expect.assertions(1)

        const currPath = `/thread/${MOCK_THREAD_W_REPLY.id}`

        const res = await request(app)
            .get(currPath)
            .send({ comment: MOCK_REPLY.comment })

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
        window.HTMLElement.prototype.scrollIntoView = jest.fn() // Mock scrollIntoView since jsdom does not implement it

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // user-event currently has an issue running in the SSR environment,
        // so fireEvent is used instead
        fireEvent.click(screen.getByRole('button', { name: /post a reply/i }))

        // Wait for the new thread form to appear
        const inputComment = await screen.findByLabelText('Comment')

        fireEvent.change(inputComment, {
            target: { value: MOCK_REPLY.comment },
        })
        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for "Post a Reply" button to reappear
        await screen.findByRole('button', { name: /post a reply/i })

        // Confirm that the reply now exists on the thread page
        expect(screen.getByText(MOCK_REPLY.comment)).toBeInTheDocument()
    })

    it('creates new reply when new reply form has comment while JavaScript is disabled', async () => {
        server.use(
            http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
                HttpResponse.json({
                    data: MOCK_THREAD_INCLUDES_REPLY,
                })
            )
        )

        expect.assertions(2)

        const currPath = `/thread/${MOCK_THREAD_W_REPLY.id}`

        const res = await request(app)
            .post(currPath)
            .send({ comment: MOCK_REPLY.comment })

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        // Make sure no validation errors were encountered on the server
        expect(store.getState().formError).toBe('')

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // Confirm that the reply now exists on the thread page
        expect(screen.getByText(MOCK_REPLY.comment)).toBeInTheDocument()
    })

    it('displays error message when there is an attempt to create a new reply without a comment', async () => {
        server.use(
            http.post(
                'http://localhost:3000/api/v1/threads/:threadId/reply',
                () =>
                    HttpResponse.json(
                        {
                            errors: [
                                {
                                    type: 'field',
                                    value: '',
                                    msg: 'Invalid value',
                                    path: 'comment',
                                    location: 'body',
                                },
                            ],
                        },
                        { status: 400 }
                    )
            )
        )

        expect.assertions(2)

        const currPath = `/thread/${MOCK_THREAD_W_COMMENT.id}`

        const res = await request(app).get(currPath)

        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        // When imported directly from Testing Library, screen cannot find
        // document.body from global-jsdom for some reason, so this is a workaround.
        const screen = getQueriesForElement(document.body, queries)

        const rootEl = window.document.getElementById('root')

        if (!rootEl) {
            throw new Error('HTML element with an ID of "root" was not found.')
        }

        const store = buildStore(window.__PRELOADED_STATE__)

        render(<TestApp initialEntries={[currPath]} store={store} />, {
            container: rootEl,
            hydrate: true,
        })

        // user-event currently has an issue running in the SSR environment,
        // so fireEvent is used instead
        fireEvent.click(screen.getByRole('button', { name: /post a reply/i }))

        // Wait for the new thread form to appear
        await screen.findByLabelText('Comment')

        fireEvent.click(screen.getByRole('button', { name: /post/i }))

        // Wait for error to appear
        await screen.findByText(/the following fields are invalid: comment/i)

        // Confirm that the user is still on the thread page
        expect(
            screen.getByText(`Id.${MOCK_THREAD_W_COMMENT.id}`)
        ).toBeInTheDocument()
        expect(
            screen.getByText(MOCK_THREAD_W_COMMENT.comment)
        ).toBeInTheDocument()
    })

    it('displays error message when there is an attempt to create a new reply without a comment while JavaScript is disabled', async () => {
        expect.assertions(1)

        const res = await request(app)
            .post(`/thread/${MOCK_THREAD_W_REPLY.id}`)
            .send({ comment: '' })

        // Because this test simulates a case where the user is browsing with JS-disabled,
        // we do not need to render the frontend of the app as it will render an impossible case.
        // We only need the jsdom to get the preloaded state generated by the server.
        cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })

        const store = buildStore(window.__PRELOADED_STATE__)

        // Make sure no validation errors were encountered on the server
        expect(store.getState().formError).toBe(
            'The following fields are invalid: comment'
        )
    })
})
