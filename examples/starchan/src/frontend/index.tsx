import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'

import App from './app/App'
import { routes } from './app/routes'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

const router = createBrowserRouter(createRoutesFromElements(routes))

const reactTree = (
    <StrictMode>
        <App>
            <RouterProvider router={router} />
        </App>
    </StrictMode>
)

if (
    process.env.NODE_ENV === 'development' &&
    window.__DEV_SERVER__ &&
    rootEl.childNodes.length === 0
) {
    const root = createRoot(rootEl)
    root.render(reactTree)
} else {
    hydrateRoot(rootEl, reactTree)
}
