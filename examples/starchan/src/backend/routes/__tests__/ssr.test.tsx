import { getQueriesForElement, queries, render } from '@testing-library/react'
import globalJsdom from 'global-jsdom'
import request from 'supertest'

import { buildStore } from '../../../frontend/common/redux'
import { TestApp } from '../../../frontend/common/util/test'
import { server } from '../../../frontend/msw/node'
import app from '../../app'
import { prismaMock } from '../../common/util/test'

let cleanupJsdom: { (): void }

beforeAll(() =>
    server.listen({
        onUnhandledRequest: (req, print) => {
            const url = new URL(req.url)

            if (url.pathname === '/') {
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

test('basic server-side rendering matches the snapshot', async () => {
    prismaMock.thread.aggregate.mockResolvedValue({
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _count: 0,
    })

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
    prismaMock.thread.aggregate.mockResolvedValue({
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _count: 0,
    })

    const res = await request(app).get('/')

    cleanupJsdom = globalJsdom(res.text, { runScripts: 'dangerously' })
    // When imported directly from Testing Library, screen cannot find
    // document.body from globalJsdom for some reason, so this is a workaround.
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
