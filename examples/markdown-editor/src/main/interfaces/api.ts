/**
 * The API is for receiving messages on the main process that originate from the
 * renderer process.
 */
import { BrowserWindow, ipcMain } from 'electron'

import { colorModes } from '../../common/types'
import { isCurrFileChanged } from '../currFile'
import setColorModeMenu from '../menu'
import { showInFolder, showOpenFileDialog } from '../open'
import { showExportHtmlDialog } from '../save'
import { saveFile } from '../save'

/**
 * Setup the listeners on the main process so they can handle messages sent from
 * the renderer process.
 */
export const setupApi = () => {
    /**
     * Listen for renderer process requests to sync the color mode menu items with the
     * color mode button.
     */
    ipcMain.on('colormodebutton', (_, colorMode: colorModes) => {
        setColorModeMenu(colorMode)
    })

    /**
     * Listen for renderer process requests to open the folder the currently opened
     * file is located in.
     */
    ipcMain.on('folderopen', () => {
        showInFolder()
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
}
