/**
 * The API is for receiving messages on the main process that originate from the
 * renderer process.
 */
import { BrowserWindow, dialog, ipcMain } from 'electron'

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
     * Listen for renderer process requests to check if there are unsaved markdown changes.
     * This will synchronously result with true if there are unsaved changes, false otherwise.
     */
    ipcMain.on('unsavedmarkdowncheck', (e, markdown: string) => {
        const browserWin = BrowserWindow.fromWebContents(e.sender)

        if (!browserWin) {
            return
        }

        e.returnValue = isCurrFileChanged(markdown)
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
    ipcMain.on('htmlexportdialog', (e, html: string) => {
        const browserWin = BrowserWindow.fromWebContents(e.sender)

        if (!browserWin) {
            return
        }

        showExportHtmlDialog(browserWin, html)
    })

    /**
     * Check to see if the current markdown has unsaved changes.
     * @return A promise that will resolve to true if there are unsaved changes, false otherwise
     */
    ipcMain.handle('markdownchange', (e, markdown) => {
        const browserWin = BrowserWindow.fromWebContents(e.sender)

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
    ipcMain.on('markdownopendialog', async (e) => {
        const browserWin = BrowserWindow.fromWebContents(e.sender)

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
     * @param markdown Markdown with potential changes from the current file
     * @param exitOnSave Flag that causes the window to close upon successful save if true
     */
    ipcMain.on('markdownsave', async (e, markdown, exitOnSave?: boolean) => {
        const browserWin = BrowserWindow.fromWebContents(e.sender)

        if (!browserWin) {
            return
        }

        const result = await saveFile(browserWin, markdown)
        if (result) {
            browserWin.webContents.send('markdownsavesuccess')

            if (exitOnSave) {
                browserWin.close()
            }
        }
    })

    /**
     * Listen for renderer process requests to open the unsaved changes dialog.
     * This will synchronously result with an Electron message box return value.
     */
    ipcMain.on('unsavedchangesdialog', async (e) => {
        const result = await dialog.showMessageBox({
            message: 'Do you want to save the changes you made?',
            detail: `Your changes will be lost if you don't save them.`,
            buttons: ['Save', `Don't Save`, 'Cancel'],
        })

        e.returnValue = result
    })
}
