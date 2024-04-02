declare interface Window {
    api: {
        checkForMarkdownChange: (markdownSrc: string) => Promise<boolean>
        checkForUnsavedChanges: (markdownSrc: string) => boolean
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
        onMainMarkdownOpenDialog: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onMainSaveFile: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        onOpenFileSuccess: (
            callback: (filePath: string, markdownSaved: string) => void,
        ) => () => import('electron').IpcRenderer
        onSaveFileSuccess: (
            callback: () => void,
        ) => () => import('electron').IpcRenderer
        saveFile: (markdown: string, exitOnSave?: boolean) => void
        showFileOpenDialog: (markdownSrc?: string) => void
        showHtmlExportDialog: (html: string) => void
        showInFolder: () => void
        showUnsavedChangesDialog: () => import('electron').MessageBoxReturnValue
        syncColorModeMenu: (
            colorMode: import('./common/types').colorModes,
        ) => void
    }
}
