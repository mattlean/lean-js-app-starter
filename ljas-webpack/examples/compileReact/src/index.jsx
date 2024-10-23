import { createRoot } from 'react-dom/client'

const HelloComponent = () => <div>Hello webpack</div>

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

const root = createRoot(rootEl)
root.render(<HelloComponent />)
