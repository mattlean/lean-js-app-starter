import './index.scss'

/**
 * Create the footer text element.
 * @returns The footer element containing the footer text elements
 */
const createFooterText = () => {
    const footerText = document.createElement('footer')
    footerText.setAttribute('id', 'footer-text')
    footerText.setAttribute('class', 'text-center text-muted')

    const line1 = document.createElement('p')
    line1.setAttribute('class', 'mb-0')
    line1.innerHTML =
        'Learn about the tech stack used for this project and more at its <a href="https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/examples/counter" class="text-muted">GitHub repo</a>.'
    footerText.appendChild(line1)

    const line2 = document.createElement('p')
    line2.innerHTML =
        'Built with <a href="https://github.com/mattlean/lean-js-app-starter" class="text-muted">Lean JS App Starter</a>.'
    footerText.appendChild(line2)

    return footerText
}

export default createFooterText
