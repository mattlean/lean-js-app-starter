import { contextBridge, ipcRenderer } from 'electron'

import { colorModes, exitTypes } from '../common/types'

export type PreloadApi = typeof API

const API = {
    /**
     * Send a message to the main process on the "markdownchange" channel.
     * This allows the renderer process to check if the current markdown source has unsaved
     * changes as the user types through the main process.
     * @param markdownSrc Markdown source with potential changes
     * @returns A promise that will resolve to true if there are unsaved changes or false otherwise
     */
    checkForMdChange: (markdownSrc: string): Promise<boolean> =>
        ipcRenderer.invoke('markdownchange', markdownSrc),

    /**
     * Send a message to the main process on the "windowcloseend" channel.
     * This allows the renderer process to close the window.
     */
    closeWindowEnd: () => {
        ipcRenderer.send('windowcloseend')
    },

    /**
     * Add a listener for the "appquitstart" channel.
     * @param callback Function to be called when a new message arrives on the "appquitstart" channel
     * @returns A function that will remove the added listener for the "appquitstart" channel when called
     */
    onAppQuitStart: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('appquitstart', listener)

        return () => ipcRenderer.removeListener('appquitstart', listener)
    },

    /**
     * Add a listener for the "colormodemenu" channel.
     * @param callback Function to be called when a new message arrives on the "colormodemenu" channel
     * @returns A function that will remove the added listener for the "colormodemenu" channel when called
     */
    onColorModeMenu: (callback: (colorMode: colorModes) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            colorMode: colorModes,
        ) => {
            callback(colorMode)
        }

        ipcRenderer.on('colormodemenu', listener)

        return () => ipcRenderer.removeListener('colormodemenu', listener)
    },

    /**
     * Add a listener for the "focusmodetoggle" channel.
     * @param callback Function to be called when a new message arrives on the "focusmodetoggle" channel
     * @returns A function that will remove the added listener for the "focusmodetoggle" channel when called
     */
    onFocusModeToggle: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('focusmodetoggle', listener)

        return () => ipcRenderer.removeListener('focusmodetoggle', listener)
    },

    /**
     * Add a listener for the "mainerrormessage" channel.
     * @param callback Function to be called when a new message arrives on the "mainerrormessage" channel
     * @returns A function that will remove the added listener for the "mainerrormessage" channel when called
     */
    onMainErrorMessage: (callback: (errorMessage: string) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            errorMessage: string,
        ) => {
            callback(errorMessage)
        }

        ipcRenderer.on('mainerrormessage', listener)

        return () => ipcRenderer.removeListener('mainerrormessage', listener)
    },

    /**
     * Add a listener for the "mainhtmlexportdialog" channel.
     * @param callback Function to be called when a new message arrives on the "mainhtmlexportdialog" channel
     * @returns A function that will remove the added listener for the "mainhtmlexportdialog" channel when called
     */
    onMainHtmlExportDialog: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('mainhtmlexportdialog', listener)

        return () =>
            ipcRenderer.removeListener('mainhtmlexportdialog', listener)
    },

    /**
     * Add a listener for the "mainmarkdownopendialog" channel.
     * @param callback Function to be called when a new message arrives on the "mainmarkdownopendialog" channel
     * @returns A function that will remove the added listener for the "mainmarkdownopendialog" channel when called
     */
    onMainMdOpenDialog: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('mainmarkdownopendialog', listener)

        return () =>
            ipcRenderer.removeListener('mainmarkdownopendialog', listener)
    },

    /**
     * Add a listener for the "mainmarkdownopenrecent" channel.
     * @param callback Function to be called when a new message arrives on the "mainmarkdownopenrecent" channel
     * @returns A function that will remove the added listener for the "mainmarkdownopenrecent" channel when called
     */
    onMainMdOpenRecent: (callback: (recentFilePath: string) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            recentFilePath: string,
        ) => {
            callback(recentFilePath)
        }

        ipcRenderer.on('mainmarkdownopenrecent', listener)

        return () =>
            ipcRenderer.removeListener('mainmarkdownopenrecent', listener)
    },

    /**
     * Add a listener for the "mainsavefile" channel.
     * @param callback Function to be called when a new message arrives on the "mainsavefile" channel
     * @returns A function that will remove the added listener for the "mainsavefile" channel when called
     */
    onMainMdSave: (callback: (exitType?: exitTypes) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            exitType?: exitTypes,
        ) => {
            callback(exitType)
        }

        ipcRenderer.on('mainmarkdownsave', listener)

        return () => ipcRenderer.removeListener('mainmarkdownsave', listener)
    },

    /**
     * Add a listener for the "markdownopensuccess" channel.
     * @param callback Function to be called when a new message arrives on the "markdownopensuccess" channel
     * @returns A function that will remove the added listener for the "markdownopensuccess" channel when called
     */
    onMdOpenSuccess: (
        callback: (filePath: string, markdownSaved: string) => void,
    ) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            filePath: string,
            markdownSaved: string,
        ) => {
            callback(filePath, markdownSaved)
        }

        ipcRenderer.on('markdownopensuccess', listener)

        return () => ipcRenderer.removeListener('markdownopensuccess', listener)
    },

    /**
     * Add a listener for the "markdownsavesuccess" channel.
     * @param callback Function to be called when a new message arrives on the "markdownsavesuccess" channel
     * @returns A function that will remove the added listener for the "markdownsavesuccess" channel when called
     */
    onMdSaveSuccess: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('markdownsavesuccess', listener)

        return () => ipcRenderer.removeListener('markdownsavesuccess', listener)
    },

    /**
     * Add a listener for the "windowclosestart" channel.
     * @param callback Function to be called when a new message arrives on the "windowclosestart" channel
     * @returns A function that will remove the added listener for the "windowclosestart" channel when called
     */
    onWindowCloseStart: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('windowclosestart', listener)

        return () => ipcRenderer.removeListener('windowclosestart', listener)
    },

    /**
     * Send a message to the main process on the "markdownopenrecent" channel.
     * This allows the renderer process to open a recently opened file through the main process.
     * @param markdownSrc Markdown source with potential changes
     */
    openRecentFile: (recentFilePath: string, currMarkdownSrc?: string) => {
        ipcRenderer.send('markdownopenrecent', recentFilePath, currMarkdownSrc)
    },

    /**
     * Send a message to the main process on the "appquitend" channel.
     * This allows the renderer process to close the window.
     */
    quitAppFinish: () => {
        ipcRenderer.send('appquitend')
    },

    /**
     * Send a message to the main process on the "markdownsave" channel.
     * This allows the renderer process to save a markdown file through the main process.
     * @param markdownSrc Markdown source to save
     * @param exitType Determines what type of exit process to take if defined
     */
    saveFile: (markdownSrc: string, exitType?: exitTypes) => {
        ipcRenderer.send('markdownsave', markdownSrc, exitType)
    },

    /**
     * Send a message to the main process on the "markdownopendialog" channel.
     * This allows the renderer process to show the markdown file open dialog through the
     * main process.
     * @param markdownSrc Markdown source with potential changes
     */
    showFileOpenDialog: (markdownSrc?: string) => {
        ipcRenderer.send('markdownopendialog', markdownSrc)
    },

    /**
     * Send a message to the main process on the "htmlexportdialog" channel.
     * This allows the renderer process to show the HTML export dialog through the main process.
     * @param html HTML string produced by markdown
     */
    showHtmlExportDialog: (html: string) => {
        ipcRenderer.send('htmlexportdialog', html)
    },

    /**
     * Send a message to the main process on the "folderopen" channel.
     * This allows the renderer process to open the folder the currently opened file is located
     * in through the main process.
     */
    showInFolder: () => {
        ipcRenderer.send('folderopen')
    },

    /**
     * Send a message to the main process on the "unsavedchangesdialog" channel.
     * This allows the renderer process to open the unsaved changes dialog through the
     * main process.
     */
    showUnsavedChangesDialog: (exitType: exitTypes) =>
        ipcRenderer.send('unsavedchangesdialog', exitType),

    /**
     * Send a message to the main process on the "colormodebutton" channel.
     * This allows the renderer process to sync the color mode menu items with the color mode
     * button through the main process.
     * @param colorMode Color mode type that determines which color mode to use
     */
    syncColorModeMenu: (colorMode: string) => {
        ipcRenderer.send('colormodebutton', colorMode)
    },
} as const

/**
 * Expose the API that the render process will use to send requests to the main process.
 */
contextBridge.exposeInMainWorld('api', API)
