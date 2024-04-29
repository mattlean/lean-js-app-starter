import {
    ElectronApplication,
    Page,
    _electron as electron,
} from '@playwright/test'

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
 * Launch the Electron application with either the development or production build.
 * @param arg Parameter object
 * @param arg.buildType Determines if the development or the production build is used for testing
 * @param arg.colorScheme Emulates 'prefers-colors-scheme' media feature, supported values are 'light', 'dark', 'no-preference'. See page.emulateMedia([options]) for more details. Passing null resets emulation to system defaults. Defaults to 'light'.
 * @returns A promise that will resolve to an Electron application representation
 */
export const launchElectron = ({
    buildType,
    colorScheme,
}: {
    buildType?: 'development' | 'production'
    colorScheme?: null | 'light' | 'dark' | 'no-preference'
} = {}) => {
    const arg =
        buildType === 'production' ? './build/production/main/main.js' : '.'

    return electron.launch({
        args: [arg],
        colorScheme,
    })
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
 * Reset the active color mode to system preference mode.
 * @param page Playwright Page instnace
 */
export const resetColorMode = (page: Page) =>
    page.evaluate(() => {
        localStorage.removeItem('theme')
        window.api.syncColorModeMenu('sysPref')
    })

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
