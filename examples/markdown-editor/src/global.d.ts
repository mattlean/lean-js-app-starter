declare interface Window {
    api: {
        checkForMarkdownChange: (markdown: string) => Promise<boolean>
        checkForUnsavedChanges: (markdown: string) => boolean
        onColorModeMenu: (
            callback: (colorMode: import('./common/types').colorModes) => void,
        ) => () => import('electron').IpcRenderer
        onFocusModeToggle: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onMainErrorMessage: (
            callback: (errorMessage: string) => void,
        ) => () => import('electron').IpcRenderer
        onMainHtmlExportDialog: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onMainSaveFile: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onReadFile: (
            callback: (filePath: string, markdown: string) => void,
        ) => () => import('electron').IpcRenderer
        showUnsavedChangesDialog: () => import('electron').MessageBoxReturnValue
        onSaveFileSuccess: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        saveFile: (markdown: string, exitOnSave?: boolean) => void
        showExportHtmlDialog: (html: string) => void
        showInFolder: () => void
        showOpenFileDialog: () => void
        syncColorModeMenu: (
            colorMode: import('./common/types').colorModes,
        ) => void
    }
}
