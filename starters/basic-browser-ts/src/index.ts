import helloWorld from './helloWorld'

const rootEl = document.getElementById('root')

if (!rootEl) {
    throw new Error('HTML element with an ID of "root" was not found.')
}

rootEl.appendChild(helloWorld())
