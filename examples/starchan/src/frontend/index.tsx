import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import HelloWorld from './components/HelloWorld'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

if (process.env.NODE_ENV === 'development' && rootEl.childNodes.length > 0) {
    hydrateRoot(
        rootEl,
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
} else {
    const root = createRoot(rootEl)
    root.render(
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
}
