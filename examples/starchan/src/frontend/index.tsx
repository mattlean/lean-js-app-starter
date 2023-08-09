import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import HelloWorld from './components/HelloWorld'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

console.log('is development?', process.env.NODE_ENV)
console.log('root child nodes amount', rootEl.childNodes.length)

if (process.env.NODE_ENV === 'development' && rootEl.childNodes.length > 0) {
    console.log('hydration happened')
    hydrateRoot(
        rootEl,
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
} else {
    console.log('render happened')
    const root = createRoot(rootEl)
    root.render(
        <StrictMode>
            <HelloWorld />
        </StrictMode>
    )
}
