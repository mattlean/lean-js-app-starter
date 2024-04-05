import { BrowserWindow, dialog, shell } from 'electron'
import { readFile } from 'node:fs/promises'

import { isFileOpen } from './currFile'
import { sendMainErrorMessage } from './interfaces/mse'

/**
 * Show the open dialog and read contents of the selected markdown file.
 * @param win Electron BrowserWindow instance
 * @returns The file path of the currently open markdown file, and the contents of the
 *     currently open markdown file, or undefined if no file was opened
 */
export const showFileOpenDialog = async (win: BrowserWindow) => {
    const result = await dialog.showOpenDialog(win, {
        title: 'Open Markdown',
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    let markdownSaved
    try {
        markdownSaved = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, win)
        } else {
            throw err
        }
    }

    return [filePath, markdownSaved as string] as const
}

/**
 * Open the folder the currently opened markdown file is located in.
 */
export const showInFolder = async () => {
    const filePath = isFileOpen()
    if (filePath) {
        await shell.showItemInFolder(filePath)
    }
}
