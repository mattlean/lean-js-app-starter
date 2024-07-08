import WebpackLogo from './webpack-logo.png'

function helloElement() {
    const element = document.createElement('img')

    element.setAttribute('src', WebpackLogo)
    element.setAttribute('alt', 'webpack logo')

    return element
}

document.body.appendChild(helloElement())
