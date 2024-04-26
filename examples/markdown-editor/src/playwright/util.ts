import { ElectronApplication, Page } from '@playwright/test'

/**
 * Display console API method calls from the Electron application in the Playwright console.
 * @param electronApp Electron application representation
 */
export const enableConsole = (electronApp: ElectronApplication) => {
    electronApp.on('console', (data) => console.log(data))
}

/**
 * Get the operating system that the browser is running in.
 * @param page Electron Page instance
 * @returns A promise that will resolve to the Browser's operating system type, or null if
 *     it could not be determined
 */
export const getBrowserOs = async (page: Page) => {
    const userAgent = await page.evaluate(
        async () => window.navigator.userAgent,
    )

    if (userAgent.includes('Windows')) {
        return 'win'
    } else if (userAgent.includes('Mac')) {
        return 'mac'
    } else if (userAgent.includes('X11')) {
        return 'unix'
    } else if (userAgent.includes('Linux')) {
        return 'linux'
    }

    return null
}

/**
 * Mock open file dialog to successfully open a file.
 * @param electronApp Electron application representation
 * @param filePath Mocked file path
 * @param markdownSrc Mocked file content
 */
export const mockOpenFileSuccess = (
    electronApp: ElectronApplication,
    filePath: string,
    markdownSaved: string,
) =>
    electronApp.evaluate(
        ({ ipcMain, BrowserWindow }, { filePath, markdownSaved }) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const browserWin = BrowserWindow.fromWebContents(e.sender)

                if (!browserWin) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                browserWin.webContents.send(
                    'markdownopensuccess',
                    filePath,
                    markdownSaved,
                )
            })
        },
        { filePath, markdownSaved },
    )

/**
 * Disable unsaved changes dialog. Useful for exiting the test application instance without
 * interruption when a test ends.
 * @param electronApp Electron application representation
 */
export const skipUnsavedChangesDialog = (electronApp: ElectronApplication) => {
    electronApp.evaluate(({ app, BrowserWindow }) => {
        const browserWin = BrowserWindow.getAllWindows()[0]

        if (browserWin) {
            browserWin.removeAllListeners('close')
        }

        app.removeAllListeners('before-quit')
    })
}
