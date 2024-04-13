/**
 * The API is for receiving messages on the main process that originate from the
 * renderer process.
 */
import { BrowserWindow, dialog, ipcMain } from 'electron'

import { colorModes } from '../../common/types'
import { isCurrFileChanged, setCurrFile } from '../currFile'
import setColorModeMenu from '../menu'
import { openFile, showFileOpenDialog, showInFolder } from '../open'
import { saveFile, showHtmlExportDialog } from '../save'

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
     * Listen for renderer process requests to show the HTML export dialog.
     */
    ipcMain.on('htmlexportdialog', (e, html: string) => {
        const win = BrowserWindow.fromWebContents(e.sender)

        if (!win) {
            return
        }

        showHtmlExportDialog(win, html)
    })

    /**
     * Listen for renderer process requests to check if the current markdown source
     * has unsaved changes as the user types.
     */
    ipcMain.handle('markdownchange', (e, markdownSrc: string) => {
        const win = BrowserWindow.fromWebContents(e.sender)

        if (!win) {
            return
        }

        const hasChanges = isCurrFileChanged(markdownSrc)
        win.setDocumentEdited(hasChanges)

        return hasChanges
    })

    /**
     * Listen for renderer process requests to show the markdown file open dialog.
     */
    ipcMain.on('markdownopendialog', async (e, markdownSrc?: string) => {
        const win = BrowserWindow.fromWebContents(e.sender)

        if (!win) {
            return
        }

        const openDialogResult = await showFileOpenDialog(win)

        if (openDialogResult) {
            if (typeof markdownSrc === 'string') {
                const hasChanges = isCurrFileChanged(markdownSrc)

                if (hasChanges) {
                    const messageBoxResult = await dialog.showMessageBox({
                        message:
                            'Do you want to save the current changes you made?',
                        detail: `Your changes will be lost if you don't save them before you open a new file.`,
                        buttons: ['Save', `Don't Save`, 'Cancel'],
                    })

                    if (messageBoxResult.response === 0) {
                        const saveFileResult = await saveFile(win, markdownSrc)
                        if (!saveFileResult) {
                            return
                        }
                    } else if (messageBoxResult.response === 2) {
                        return
                    }
                }
            }

            setCurrFile(openDialogResult[0], openDialogResult[1], win)
            win.webContents.send(
                'markdownopensuccess',
                openDialogResult[0],
                openDialogResult[1],
            )
        }
    })

    /**
     * Listen for renderer process requests to open a recently opened file.
     */
    ipcMain.on(
        'markdownopenrecent',
        async (e, recentFilePath: string, currMarkdownSrc?: string) => {
            const win = BrowserWindow.fromWebContents(e.sender)

            if (!win) {
                return
            }

            const newMarkdownSrc = await openFile(win, recentFilePath)

            if (
                typeof newMarkdownSrc === 'string' &&
                typeof currMarkdownSrc === 'string'
            ) {
                const hasChanges = isCurrFileChanged(currMarkdownSrc)

                if (hasChanges) {
                    const messageBoxResult = await dialog.showMessageBox({
                        message:
                            'Do you want to save the current changes you made?',
                        detail: `Your changes will be lost if you don't save them before you open a new file.`,
                        buttons: ['Save', `Don't Save`, 'Cancel'],
                    })

                    if (messageBoxResult.response === 0) {
                        const saveFileResult = await saveFile(
                            win,
                            currMarkdownSrc,
                        )
                        if (!saveFileResult) {
                            return
                        }
                    } else if (messageBoxResult.response === 2) {
                        return
                    }
                }

                setCurrFile(recentFilePath, newMarkdownSrc, win)
                win.webContents.send(
                    'markdownopensuccess',
                    recentFilePath,
                    newMarkdownSrc,
                )
            }
        },
    )

    /**
     * Listen for renderer process requests to save a markdown file.
     */
    ipcMain.on(
        'markdownsave',
        async (e, markdownSrc: string, exitOnSave?: boolean) => {
            const win = BrowserWindow.fromWebContents(e.sender)

            if (!win) {
                return
            }

            const result = await saveFile(win, markdownSrc)
            if (result) {
                win.webContents.send('markdownsavesuccess')

                if (exitOnSave) {
                    win.close()
                }
            }
        },
    )

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

    /**
     * Listen for renderer process requests to check if there are unsaved markdown source changes.
     * This will synchronously result with true if there are unsaved changes or false otherwise.
     */
    ipcMain.on('unsavedmarkdowncheck', (e, markdownSrc: string) => {
        const win = BrowserWindow.fromWebContents(e.sender)

        if (!win) {
            return
        }

        e.returnValue = isCurrFileChanged(markdownSrc)
    })
}
