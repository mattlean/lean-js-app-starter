import { screen } from '@testing-library/dom'

import helloWorld from './helloWorld'

/**
 * Setup the initial document with the root element.
 */
function setupDocument() {
    const rootEl = document.createElement('div')
    rootEl.setAttribute('id', 'root')
    document.body.appendChild(rootEl)
}

beforeEach(() => setupDocument())

test('helloWorld function renders "Hello World!" div element', () => {
    helloWorld()

    expect(screen.getByText(/hello world!/i)).toBeInTheDocument()
})
