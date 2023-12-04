import { MemoryRouter, MemoryRouterProps, Routes } from 'react-router-dom'

import App from '../../app/App'
import { jsxRoutes } from '../../app/routes'
import { Store } from '../../app/store'

export interface TestAppProps {
    initialEntries: MemoryRouterProps['initialEntries']
    store: Store
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
