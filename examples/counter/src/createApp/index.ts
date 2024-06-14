import Counter from '../Counter'
import createFooterText from '../createFooterText'

/**
 * Create the app element.
 * @returns The app element containing the counter and footer text elements
 */
const createApp = (rootEl: HTMLElement) => {
    const app = document.createElement('div')
    app.setAttribute('class', 'align-items-center d-flex flex-column h-100')

    const c = new Counter()
    app.appendChild(c.createElement())
    app.appendChild(createFooterText())

    rootEl.replaceChildren(app)

    return app
}

export default createApp
