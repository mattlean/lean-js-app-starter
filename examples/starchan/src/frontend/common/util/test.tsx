import { MemoryRouter, MemoryRouterProps, Routes } from 'react-router-dom'

import App from '../../app/App'
import { jsxRoutes } from '../../app/routes'
import { Store } from '../../app/store'
import { server } from '../../msw/node'

export interface TestAppProps {
    initialEntries: MemoryRouterProps['initialEntries']
    store: Store
}

export const setupMsw = () => {
    // Enable API mocking before all the tests.
    beforeAll(() => server.listen())

    // Reset the request handlers between each test.
    // This way the handlers we add on a per-test basis
    // do not leak to other, irrelevant tests.
    afterEach(() => server.resetHandlers())

    // Finally, disable API mocking after the tests are done.
    afterAll(() => server.close())
}

export function TestApp({ initialEntries, store }: TestAppProps) {
    return (
        <App store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>{jsxRoutes}</Routes>
            </MemoryRouter>
        </App>
    )
}
