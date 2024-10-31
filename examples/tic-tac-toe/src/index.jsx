import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Game from './Game'
import './style.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

const root = createRoot(rootEl)
root.render(
    <StrictMode>
        <Game />
    </StrictMode>,
)
