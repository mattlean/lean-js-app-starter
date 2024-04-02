/**
 * Main-sent events (MSE) send messages that originate from the main process and
 * are transmitted to the renderer process.
 *
 * This is the opposite of the API where the system goes in reverse and messages
 * originate from the renderer process and are transmitted to the main process.
 */
import { BrowserWindow } from 'electron'

import { colorModes } from '../../common/types'

/**
 * Tell the renderer process to send an API request to initiate the save process.
 * @param browserWin Electron BrowserWindow instance
 */
export const saveFileMain = (browserWin?: BrowserWindow) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('mainmarkdownsave')
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
 * Tell the renderer process to send an API request to show the export HTML dialog.
 * @param browserWin Electron BrowserWindow instance
 */
export const showExportHtmlDialogMain = (browserWin?: BrowserWindow) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('mainhtmlexportdialog')
}

/**
 * Tell the renderer process to send an API request to show the open file dialog.
 * @param browserWin Electron BrowserWindow instance
 */
export const showOpenFileDialogMain = (browserWin?: BrowserWindow) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('markdownopendialog')
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

/**
 * Tell the renderer process to sync the color mode button with the color mode menu.
 * @param colorMode Color mode type that determines which color mode to use
 * @param browserWin Electron BrowserWindow instance
 */
export const syncColorModeBtn = (
    colorMode: colorModes,
    browserWin?: BrowserWindow,
) => {
    const win = browserWin ?? BrowserWindow.getFocusedWindow()

    if (!win) {
        return
    }

    win.webContents.send('colormodemenu', colorMode)
}
