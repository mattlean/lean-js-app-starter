export default function helloWorld() {
    const rootEl = document.getElementById('root')

    if (!rootEl) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    const helloWorldDiv = document.createElement('div')
    helloWorldDiv.textContent = 'Hello World!'
    rootEl.appendChild(helloWorldDiv)
}
