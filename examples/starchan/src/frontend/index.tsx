import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import HelloWorld from './components/HelloWorld'
import './index.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

if (
    process.env.NODE_ENV === 'development' &&
    window.DEV_SERVER &&
    rootEl.childNodes.length === 0
) {
    const root = createRoot(rootEl)
    root.render(
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
} else {
    hydrateRoot(
        rootEl,
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
}
