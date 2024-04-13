import { ElectronApplication, Page } from '@playwright/test'

/**
 * Disable unsaved changes dialog. Useful for exiting the test application instance without
 * interruption when a test ends.
 * @param electronApp Electron application representation
 */
export const disableUnsavedChangesDialog = (electronApp: ElectronApplication) =>
    electronApp.evaluate(({ ipcMain }) => {
        ipcMain.removeAllListeners('unsavedchangesdialog')
        ipcMain.on('unsavedchangesdialog', async (e) => {
            e.returnValue = { response: 1, checkboxChecked: false }
        })
    })

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
export const mockOpenFileSuccess = async (
    electronApp: ElectronApplication,
    filePath: string,
    markdownSaved: string,
) =>
    await electronApp.evaluate(
        ({ ipcMain, BrowserWindow }, { filePath, markdownSaved }) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const win = BrowserWindow.fromWebContents(e.sender)

                if (!win) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                win.webContents.send(
                    'markdownopensuccess',
                    filePath,
                    markdownSaved,
                )
            })
        },
        { filePath, markdownSaved },
    )
