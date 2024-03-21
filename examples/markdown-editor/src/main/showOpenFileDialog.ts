import { BrowserWindow, dialog } from 'electron'
import { readFile } from 'node:fs/promises'

import { setCurrFile } from './api/currFile'
import { sendMainErrorMessage } from './mse'
import { createWindow } from './window'

/**
 * Show the open dialog and read the markdown file.
 * @param browserWin Electron BrowserWindow instance
 * @return A promise that will resolve to the file path and markdown of the currently
 *     open file, or null if the process was cancelled
 */
const showOpenFileDialog = async (browserWin?: BrowserWindow) => {
    let win = browserWin ?? BrowserWindow.getFocusedWindow()
    if (!win) {
        win = createWindow()
    }

    const result = await dialog.showOpenDialog(win, {
        title: 'Open Markdown',
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return null
    }

    const [filePath] = result.filePaths

    let markdown
    try {
        markdown = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, win)
            return null
        } else {
            throw err
        }
    }

    setCurrFile(filePath, markdown as string, win)
    return [filePath, markdown as string]
}

export default showOpenFileDialog
