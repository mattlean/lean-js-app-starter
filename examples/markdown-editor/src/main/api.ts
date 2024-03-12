import { BrowserWindow, dialog, ipcMain } from 'electron'
import { readFile, writeFile } from 'node:fs/promises'

/**
 * Show the save dialog and export HTML
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

    await writeFile(filePath, html, { encoding: 'utf-8' })
}

/**
 * Show the open dialog and read the markdown file.
 * @param browserWin Electron BrowserWindow instance
 */
export const showOpenFileDialog = async (browserWin: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWin, {
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md', 'txt'] }],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    const content = await readFile(filePath, { encoding: 'utf-8' })

    browserWin.webContents.send('open-file-dialog-read', content, filePath)
}

/**
 * Listen for messages on the "export-html-dialog" channel coming from the renderer process.
 */
ipcMain.on('export-html-dialog', async (event, html: string) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    showExportHtmlDialog(browserWin, html)
})

/**
 * Listen for messages on the "open-file-dialog" channel coming from the renderer process.
 */
ipcMain.on('open-file-dialog', (event) => {
    const browserWin = BrowserWindow.fromWebContents(event.sender)

    if (!browserWin) {
        return
    }

    showOpenFileDialog(browserWin)
})
