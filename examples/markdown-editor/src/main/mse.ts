/**
 * Main-sent events (MSE) send messages that originate from the main process and
 * are transmitted to the renderer process.
 *
 * This is the opposite of the API where the system goes in reverse and messages
 * originate from the renderer process and are transmitted to the main process.
 */
import { BrowserWindow } from 'electron'

/**
 * Tell the renderer process to send an API request to initiate the save process.
 * @param browserWin Electron BrowserWindow instance
 */
export const saveFileMain = (browserWin?: BrowserWindow) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('mainsavefile')
}

/**
 * Send an error message from the main process to the renderer process.
 * @param err Error with message to display in the renderer process
 * @param browserWin Electron BrowserWindow instance
 */
export const sendMainErrorMessage = (
    err: Error,
    browserWin?: BrowserWindow,
) => {
    console.error(err)

    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('mainerrormessage', err.message)
}

/**
 * Tell the renderer process to toggle focus mode from the main process.
 * @param browserWin Electron BrowserWindow instance
 */
export const toggleFocusMode = (browserWin?: BrowserWindow) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('focusmodetoggle')
}
