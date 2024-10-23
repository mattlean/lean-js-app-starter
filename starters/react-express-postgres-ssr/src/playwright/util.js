/**
 * Load the frontend application with either the development or end-to-end host.
 * By default the PLAYWRIGHT_HOST environment variable will be used. If the E2E environment
 * variable is true, then the PLAYWRIGHT_HOST_E2E environment variable will be used instead.
 * You can override these environment variables through some of the available parameters.
 * @param page Playwright Page instance
 * @param arg Parameter object
 * @param arg.gotoOptions Options to pass to Page.goto method
 * @param arg.serverType Determines if the development or end-to-end host is used for testing. Overrides E2E environment variable.
 * @param arg.url Manually set the URL. Overrides all behaviors caused by environment variables.
 * @returns A promise that will resolve to the main resource response
 */
export const loadApp = (page, { gotoOptions, serverType, url } = {}) => {
    let u = process.env.E2E
        ? process.env.PLAYWRIGHT_HOST_E2E
        : process.env.PLAYWRIGHT_HOST
    if (url) {
        u = url
    } else if (process.env.PLAYWRIGHT_HOST_E2E && serverType === 'e2e') {
        u = process.env.PLAYWRIGHT_HOST_E2E
    }

    if (!u) {
        throw new Error('Host was not set')
    }

    return page.goto(u, gotoOptions)
}
