/**
 * Create a div element with the contents "Hello World!"
 */
export default function helloWorld() {
    const helloWorldDiv = document.createElement('div')
    helloWorldDiv.textContent = 'Hello World!'

    return helloWorldDiv
}
