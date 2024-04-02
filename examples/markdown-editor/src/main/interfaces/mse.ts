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
 * @param win Electron BrowserWindow instance
 */
export const saveFileMain = (win?: BrowserWindow) => {
    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('mainmarkdownsave')
}

/**
 * Send an error message to the renderer process.
 * @param err Error with message to display in the renderer process
 * @param win Electron BrowserWindow instance
 */
export const sendMainErrorMessage = (err: Error, win?: BrowserWindow) => {
    console.error(err)

    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('mainerrormessage', err.message)
}

/**
 * Tell the renderer process to send an API request to initiate the file open process.
 * @param win Electron BrowserWindow instance
 */
export const showFileOpenDialogMain = (win?: BrowserWindow) => {
    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('markdownopendialog')
}

/**
 * Tell the renderer process to send an API request to initiate the HTML export process.
 * @param win Electron BrowserWindow instance
 */
export const showHtmlExportDialogMain = (win?: BrowserWindow) => {
    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('mainhtmlexportdialog')
}

/**
 * Tell the renderer process to sync the color button with the color mode menu items.
 * @param colorMode Color mode type that determines which color mode to use
 * @param win Electron BrowserWindow instance
 */
export const syncColorModeBtn = (
    colorMode: colorModes,
    win?: BrowserWindow,
) => {
    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('colormodemenu', colorMode)
}

/**
 * Tell the renderer process to toggle the focus mode.
 * @param win Electron BrowserWindow instance
 */
export const toggleFocusMode = (win?: BrowserWindow) => {
    const w = win ?? BrowserWindow.getFocusedWindow()

    if (!w) {
        return
    }

    w.webContents.send('focusmodetoggle')
}
