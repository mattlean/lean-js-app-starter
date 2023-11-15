import { Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import App from '../../frontend/app/App'
import { jsxRoutes } from '../../frontend/app/routes'
import { Store } from '../../frontend/app/store'

export interface Props {
    location: string
    store: Store
}

/**
 * React App component used for server-side rendering.
 */
export default function ServerReactApp({ location, store }: Props) {
    return (
        <App store={store}>
            <StaticRouter location={location}>
                <Routes>{jsxRoutes}</Routes>
            </StaticRouter>
        </App>
    )
}
