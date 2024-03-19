/**
 * The API is for receiving messages on the main process that originate from the
 * renderer process.
 */
import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { readFile, writeFile } from 'node:fs/promises'

import { sendMainErrorMessage } from '../mse'
import { createWindow } from '../window'
import {
    getCurrFilePath,
    isCurrFileChanged,
    isFileOpen,
    setCurrFile,
    setupCurrFile,
} from './currFile'

const currFile = setupCurrFile()

/**
 * Save the markdown.
 * If a markdown file is currently open, overwrite the current contents of it
 * with the new markdown.
 * Optionally, if there is no markdown file currently open, open the save dialog
 * so a new markdown file can be created.
 * @param browserWin Electron BrowserWindow instance
 * @param markdown Markdown with potential changes from the current file
 * @return A promise that will resolve to true if a save occured, false otherwise
 */
export const saveFile = async (browserWin: BrowserWindow, markdown: string) => {
    if (!markdown && !isFileOpen()) {
        return false
    }

    const filePath = await getCurrFilePath(browserWin, showSaveDialog)

    if (!filePath) {
        return false
    }

    try {
        await writeFile(filePath, markdown, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, browserWin)
        } else {
            throw err
        }
    }

    setCurrFile(filePath, markdown, browserWin)
    browserWin.setDocumentEdited(false)

    return true
}

/**
 * Show the save dialog and export the markdown as an HTML file.
 * @param browserWin Electron BrowserWindow instance
 * @param html HTML string produced by markdown
 */
export const showExportHtmlDialog = async (
    browserWin: BrowserWindow,
    html: string,
) => {
    const result = await dialog.showSaveDialog(browserWin, {
        title: 'Export HTML',
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
 * Show the open dialog and read the markdown file.
 * @param browserWin Electron BrowserWindow instance
 */
export const showOpenFileDialog = async (browserWin?: BrowserWindow) => {
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
        return
    }

    const [filePath] = result.filePaths

    let markdown
    try {
        markdown = await readFile(filePath, { encoding: 'utf-8' })
    } catch (err) {
        if (err instanceof Error) {
            sendMainErrorMessage(err, win)
        } else {
            throw err
        }
    }

    setCurrFile(filePath, markdown as string, win)
    return [filePath, markdown as string]
}

/**
 * Show the save dialog and create a new markdown file.
 * @param browserWin Electron BrowserWindow instance
 * @return The file path for the markdown file was saved, undefined otherwise
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

/**
 * Listen for renderer process requests to open the folder the currently opened
 * file is located in.
 */
ipcMain.on('folderopen', async () => {
    if (currFile.filePath) {
        await shell.showItemInFolder(currFile.filePath)
    }
})

/**
 * Listen for renderer process requests to export an HTML file.
 */
ipcMain.on('htmlexportdialog', (event, html: string) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    showExportHtmlDialog(browserWin, html)
})

/**
 * Check to see if the current markdown has unsaved changes.
 */
ipcMain.handle('markdownchange', (event, markdown) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    const hasChanges = isCurrFileChanged(markdown)
    browserWin.setDocumentEdited(hasChanges)

    return hasChanges
})

/**
 * Listen for renderer process requests to show the markdown file open dialog.
 */
ipcMain.on('markdownopendialog', async (event) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    const result = await showOpenFileDialog(browserWin)
    if (result) {
        browserWin.webContents.send('markdownread', result[0], result[1])
    }
})

/**
 * Listen for renderer process requests to save a markdown file.
 */
ipcMain.on('markdownsave', async (event, markdown) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    const result = await saveFile(browserWin, markdown)
    if (result) {
        browserWin.webContents.send('markdownsavesuccess')
    }
})
