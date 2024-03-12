import { contextBridge, ipcRenderer } from 'electron'

/**
 * Expose the API that the renderers will use to send requests to the main process.
 */
contextBridge.exposeInMainWorld('api', {
    /**
     * Add a listener for the "fileread" channel.
     * @param callback Function to be called when a new message arrives on the "fileread" channel
     * @return A function that will remove the added listener for the "fileread" channel when called.
     */
    onReadFile: (callback: (content?: string) => void) => {
        const listener = (_: Electron.IpcRendererEvent, content: string) => {
            callback(content)
        }

        ipcRenderer.on('open-file-dialog-read', listener)

        return () =>
            ipcRenderer.removeListener('open-file-dialog-read', listener)
    },

    /**
     * Send a message to the main process on the "export-html-dialog" channel.
     * This allows the renderer to show the export HTML dialog through the main process.
     */
    showExportHtmlDialog: (html: string) => {
        ipcRenderer.send('export-html-dialog', html)
    },

    /**
     * Send a message to the main process on the "open-file-dialog" channel.
     * This allows the renderer to show the open file dialog through the main process.
     */
    showOpenFileDialog: () => {
        ipcRenderer.send('open-file-dialog')
    },
})
