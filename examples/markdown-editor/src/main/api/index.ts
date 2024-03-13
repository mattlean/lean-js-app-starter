import { BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { readFile, writeFile } from 'node:fs/promises'

import {
    getCurrFilePath,
    isCurrFileChanged,
    setCurrFile,
    setupCurrFile,
} from './currFile'

const currFile = setupCurrFile()

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
            browserWin.webContents.send('mainerrormessage', err.message)
        } else {
            throw err
        }
    }
}

/**
 * Show the save dialog and create a new markdown file.
 * @param browserWin Electron BrowserWindow instance
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
 * Save the markdown.
 * If a markdown file is currently open, overwrite the current contents of it
 * with the new markdown.
 * Optionally, if there is no markdown file currently open, open the save dialog so a new
 * markdown file can be created.
 * @param browserWin Electron BrowserWindow instance
 * @param markdown Markdown with potential changes from the current file
 */
export const saveFile = async (browserWin: BrowserWindow, markdown: string) => {
    const filePath = await getCurrFilePath(browserWin, showSaveDialog)

    if (!filePath) {
        return
    }

    try {
        await writeFile(filePath, markdown, { encoding: 'utf-8' })
        setCurrFile(filePath, markdown, browserWin)
    } catch (err) {
        if (err instanceof Error) {
            browserWin.webContents.send('mainerrormessage', err.message)
        } else {
            throw err
        }
    }
}

/**
 * Show the open dialog and read the markdown file.
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

    try {
        const markdown = await readFile(filePath, { encoding: 'utf-8' })
        setCurrFile(filePath, markdown, browserWin)
        browserWin.webContents.send('markdownread', filePath, markdown)
    } catch (err) {
        if (err instanceof Error) {
            browserWin.webContents.send('mainerrormessage', err.message)
        } else {
            throw err
        }
    }
}

/**
 * Listen for messages on the "folderopen" channel coming from the renderer process.
 */
ipcMain.on('folderopen', async () => {
    if (currFile.filePath) {
        await shell.showItemInFolder(currFile.filePath)
    }
})

/**
 * Listen for messages on the "htmlexportdialog" channel coming from the renderer process.
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

    const hasChanges = isCurrFileChanged(markdown)

    browserWin?.setDocumentEdited(hasChanges)

    return hasChanges
})

/**
 * Listen for messages on the "markdownopendialog" channel coming from the renderer process.
 */
ipcMain.on('markdownopendialog', (event) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    showOpenFileDialog(browserWin)
})

/**
 * Listen for messages on the "markdownsave" channel coming from the renderer process.
 */
ipcMain.on('markdownsave', async (event, markdown) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    await saveFile(browserWin, markdown)
})
