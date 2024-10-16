declare interface Window {
    /**
     * The API exposed from the preload script that allows the renderer process to
     * communicate with the main process.
     */
    api: import('./preload').PreloadApi
}
