import { createRoot, hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './app/App'
import { store } from './app/store'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

const reactTree = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
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
