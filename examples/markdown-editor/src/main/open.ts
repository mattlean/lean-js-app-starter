import { BrowserWindow, dialog, shell } from 'electron'
import { readFile } from 'node:fs/promises'

import { isFileOpen } from './currFile'
import { sendMainErrorMessage } from './interfaces/mse'

/**
 * Open a file and retrieve its contents.
 * @param win BrowserWindow instance
 * @param filePath The file path of the markdown file.
 * @returns The contents of the markdown file.
 */
export const openFile = async (win: BrowserWindow, filePath: string) => {
    let fileContent
    try {
        fileContent = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, win)
            return
        } else {
            throw err
        }
    }

    return fileContent
}

/**
 * Show the open dialog and read contents of the selected markdown file.
 * @param win BrowserWindow instance
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

    const markdownSaved = await openFile(win, filePath)

    if (typeof markdownSaved === 'string') {
        return [filePath, markdownSaved] as const
    }
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
