declare interface Window {
    api: {
        checkForMarkdownChange: (markdown: string) => Promise<boolean>
        onMainErrorMessage: (
            callback: (errorMessage: string) => void,
        ) => () => import('electron').IpcRenderer
        onReadFile: (
            callback: (filePath: string, markdown: string) => void,
        ) => () => import('electron').IpcRenderer
        saveFile: (markdown: string) => void
        showExportHtmlDialog: (html: string) => void
        showInFolder: () => void
        showOpenFileDialog: () => void
    }
}
