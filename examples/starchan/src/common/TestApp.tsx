import { MemoryRouter, MemoryRouterProps, Routes } from 'react-router-dom'

import App from '../frontend/app/App'
import { jsxRoutes } from '../frontend/app/routes'
import { Store } from '../frontend/app/store'

export interface TestAppProps {
    initialEntries: MemoryRouterProps['initialEntries']
    store: Store
}

/**
 * App component used for client-side testing.
 */
export function TestApp({ initialEntries, store }: TestAppProps) {
    return (
        <App store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>{jsxRoutes}</Routes>
            </MemoryRouter>
        </App>
    )
}
