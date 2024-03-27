import { contextBridge, ipcRenderer } from 'electron'

import { colorModes } from '../common/types'

/**
 * Expose the API that the renderers will use to send requests to the main process.
 */
contextBridge.exposeInMainWorld('api', {
    /**
     * Send a message to the main process on the "markdownchange" channel.
     * This allows the renderer to know when the editor has unsaved changes through the main process.
     * @param markdown Markdown with potential changes from the current file
     * @return A promise that will resolve to true if there are unsaved changes, false otherwise
     */
    checkForMarkdownChange: async (markdown: string) => {
        const result = await ipcRenderer.invoke('markdownchange', markdown)
        return result
    },

    /**
     * Add a listener for the "colormodemenu" channel.
     * @param callback Function to be called when a new message arrives on the "colormodemenu" channel
     * @return A function that will remove the added listener for the "colormodemenu" channel when called
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
     * @return A function that will remove the added listener for the "focusmodetoggle" channel when called
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
     * @return A function that will remove the added listener for the "mainerrormessage" channel when called
     */
    onMainErrorMessage: (callback: (mainErrorMessage: string) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            mainErrorMessage: string,
        ) => {
            callback(mainErrorMessage)
        }

        ipcRenderer.on('mainerrormessage', listener)

        return () => ipcRenderer.removeListener('mainerrormessage', listener)
    },

    /**
     * Add a listener for the "mainhtmlexportdialog" channel.
     * @param callback Function to be called when a new message arrives on the "mainhtmlexportdialog" channel
     * @return A function that will remove the added listener for the "mainhtmlexportdialog" channel when called
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
     * Add a listener for the "mainsavefile" channel.
     * @param callback Function to be called when a new message arrives on the "mainsavefile" channel
     * @return A function that will remove the added listener for the "mainsavefile" channel when called
     */
    onMainSaveFile: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('mainmarkdownsave', listener)

        return () => ipcRenderer.removeListener('mainmarkdownsave', listener)
    },

    /**
     * Add a listener for the "markdownread" channel.
     * @param callback Function to be called when a new message arrives on the "markdownread" channel
     * @return A function that will remove the added listener for the "markdownread" channel when called
     */
    onReadFile: (callback: (filePath: string, markdown: string) => void) => {
        const listener = (
            _: Electron.IpcRendererEvent,
            filePath: string,
            markdown: string,
        ) => {
            callback(filePath, markdown)
        }

        ipcRenderer.on('markdownread', listener)

        return () => ipcRenderer.removeListener('markdownread', listener)
    },

    /**
     * Add a listener for the "markdownsavesuccess" channel.
     * @param callback Function to be called when a new message arrives on the "markdownsavesuccess" channel
     * @return A function that will remove the added listener for the "markdownsavesuccess" channel when called
     */
    onSaveFileSuccess: (callback: () => void) => {
        const listener = () => {
            callback()
        }

        ipcRenderer.on('markdownsavesuccess', listener)

        return () => ipcRenderer.removeListener('markdownsavesuccess', listener)
    },

    /**
     * Send a message to the main process on the "markdownsave" channel.
     * This allows the renderer to a save markdown file through the main process.
     * @param markdown Markdown with potential changes from the current file
     */
    saveFile: (markdown: string) => {
        ipcRenderer.send('markdownsave', markdown)
    },

    /**
     * Send a message to the main process on the "htmlexportdialog" channel.
     * This allows the renderer to show the export HTML dialog through the main process.
     * @param html HTML string produced by markdown
     */
    showExportHtmlDialog: (html: string) => {
        ipcRenderer.send('htmlexportdialog', html)
    },

    /**
     * Send a message to the main process on the "folderopen" channel.
     * This allows the renderer to open the folder the file exists in through the main process.
     */
    showInFolder: () => {
        ipcRenderer.send('folderopen')
    },

    /**
     * Send a message to the main process on the "markdownopendialog" channel.
     * This allows the renderer to show the open file dialog through the main process.
     */
    showOpenFileDialog: () => {
        ipcRenderer.send('markdownopendialog')
    },

    /**
     * Send a message to the main process on the "colormodebutton" channel.
     * This allows the renderer to set the checked properties in the color mode submenu.
     * @param colorMode Color mode type that determines which color mode to use
     */
    syncColorModeMenu: (colorMode: string) => {
        ipcRenderer.send('colormodebutton', colorMode)
    },
})
