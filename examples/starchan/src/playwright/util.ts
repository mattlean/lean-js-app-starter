import { Page } from '@playwright/test'

/**
 * Load the frontend app with either the regular host or the E2E host.
 * @param arg Parameter object
 * @param arg.page Playwright Page instance
 * @param arg.e2e Force loads the E2E host when true or the regular host when false. The host is determined by the E2E environment variable if this is undefined.
 * @returns A promise that will resolve to the main resource response
 */
export const loadApp = ({ page, e2e }: { page: Page; e2e?: boolean }) => {
    let url = process.env.E2E ? process.env.HOST_E2E : process.env.HOST

    if (typeof e2e === 'boolean') {
        url = e2e ? process.env.HOST_E2E : process.env.HOST
    }

    if (!url) {
        throw new Error('Host was not set')
    }

    return page.goto(url)
}
