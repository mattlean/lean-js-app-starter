import { BrowserWindow, dialog, shell } from 'electron'
import { readFile } from 'node:fs/promises'

import { setCurrFile } from './currFile'
import { isFileOpen } from './currFile'
import { sendMainErrorMessage } from './interfaces/mse'

/**
 * Open the folder the currently opened file is located in.
 */
export const showInFolder = async () => {
    const filePath = isFileOpen()
    if (filePath) {
        await shell.showItemInFolder(filePath)
    }
}

/**
 * Show the open dialog and read the selected markdown file.
 * @param browserWin Electron BrowserWindow instance
 */
export const showOpenFileDialog = async (browserWin: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWin, {
        title: 'Open Markdown',
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    let markdown
    try {
        markdown = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, browserWin)
        } else {
            throw err
        }
    }

    setCurrFile(filePath, markdown as string, browserWin)
    return [filePath, markdown as string]
}
