import { ElectronApplication } from '@playwright/test'

/**
 * Display console API method calls from the Electron application in the Playwright console.
 */
export const enableConsole = (electronApp: ElectronApplication) => {
    electronApp.on('console', (data) => console.log(data))
}
