import { BrowserWindow, dialog } from 'electron'
import { writeFile } from 'node:fs/promises'
import { basename } from 'path'

import { getCurrFilePath, isFileOpen, setCurrFile } from './currFile'
import { sendMainErrorMessage } from './interfaces/mse'

/**
 * Save the markdown.
 * If a markdown file is currently open, overwrite its current contents with the
 * markdown source.
 * Optionally, if there is no markdown file currently open, open the save dialog
 * so a new markdown file can be created.
 * @param browserWin Electron BrowserWindow instance
 * @param markdownSrc Markdown source to save
 * @return A promise that will resolve to true if a save occured or false otherwise
 */
export const saveFile = async (
    browserWin: BrowserWindow,
    markdownSrc: string,
) => {
    if (!markdownSrc && !isFileOpen()) {
        return false
    }

    const filePath = await getCurrFilePath(browserWin, showSaveDialog)

    if (!filePath) {
        return false
    }

    try {
        await writeFile(filePath, markdownSrc, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, browserWin)
        } else {
            throw err
        }
    }

    setCurrFile(filePath, markdownSrc, browserWin)
    browserWin.setDocumentEdited(false)

    return true
}

/**
 * Show the HTML export dialog and create an HTML file from the markdown source.
 * @param browserWin Electron BrowserWindow instance
 * @param html HTML string produced by markdown
 */
export const showHtmlExportDialog = async (
    browserWin: BrowserWindow,
    html: string,
) => {
    const currFilePath = isFileOpen()

    let defaultPath: string | undefined = undefined

    if (currFilePath) {
        defaultPath = basename(currFilePath, '.md')
    }

    const result = await dialog.showSaveDialog(browserWin, {
        title: 'Export HTML',
        defaultPath,
        filters: [{ name: 'HTML File', extensions: ['html', 'htm'] }],
    })

    if (result.canceled) {
        return
    }

    const { filePath } = result

    if (!filePath) {
        return
    }

    try {
        await writeFile(filePath, html, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, browserWin)
        } else {
            throw err
        }
    }
}

/**
 * Show the save dialog and create a new markdown file.
 * @param browserWin Electron BrowserWindow instance
 * @return A promise that will resolve to the file path for the saved markdown file
 *     or undefined otherwise
 */
export const showSaveDialog = async (browserWin: BrowserWindow) => {
    const result = await dialog.showSaveDialog(browserWin, {
        title: 'Save Markdown',
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return
    }

    const { filePath } = result

    if (!filePath) {
        return
    }

    return filePath
}
