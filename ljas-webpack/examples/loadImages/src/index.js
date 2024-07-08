import WebpackLogo from './webpack-logo.png'

function component() {
    const element = document.createElement('img')

    element.setAttribute('src', WebpackLogo)
    element.setAttribute('alt', 'webpack logo')

    return element
}

document.body.appendChild(component())
