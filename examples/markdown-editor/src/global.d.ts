declare interface Window {
    api: {
        onReadFile: (
            callback: (content?: string) => void,
        ) => () => import('electron').IpcRenderer
        showExportHtmlDialog: (html: string) => void
        showOpenFileDialog: () => void
    }
}
