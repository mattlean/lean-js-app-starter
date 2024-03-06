import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/App'
import './index.css'

// const openFileBtn = document.getElementById('btn-open-file')

// if (!openFileBtn) {
//     throw new Error('HTML element with an ID of "btn-open-file" was not found.')
// }

// openFileBtn.addEventListener('click', () => {
//     console.log('click occurred')
//     window.api.showOpenDialog()
// })

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

const root = createRoot(rootEl)
root.render(
    <StrictMode>
        <App />
    </StrictMode>,
)
