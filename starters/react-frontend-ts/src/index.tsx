import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import HelloWorld from './HelloWorld'

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <HelloWorld />
    </StrictMode>
)
