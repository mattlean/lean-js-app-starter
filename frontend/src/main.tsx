import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './style.css'

const rootEle = document.getElementById('root')

if (rootEle === null) {
  throw new Error('Root element could not be found in the document.')
}

const reactRoot = createRoot(rootEle)
reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
)
