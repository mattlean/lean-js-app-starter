import { BrowserWindow, app } from 'electron'
import { basename } from 'path'

interface MdFile {
    /**
     * The contents of the currently open markdown file.
     */
    markdown: string

    /**
     * The presence of filePath means that a file currently is open.
     * If it is undefined, then no file is currently open.
     */
    filePath?: string
}

/** currFile singleton that keeps track of the currently open markdown file and its contents. */
let currFile: MdFile | null = null

/**
 * Setup the currFile singleton.
 * @return currFile singleton
 */
export const setupCurrFile = () => {
    currFile = {
        markdown: '',
        filePath: undefined,
    }

    return currFile
}

/**
 * Get the current file path.
 * If no file path exists, optionally open the save dialog to save the current markdown in a file
 * and get a new file path.
 * @param browserWin Electron BrowserWindow instance
 * @param showSaveDialog showSaveDialog function to open the save dialog
 */
export const getCurrFilePath = (
    browserWin?: BrowserWindow,
    showSaveDialog?: (browserWin: BrowserWindow) => Promise<string | undefined>,
) => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    if (currFile.filePath) {
        return currFile.filePath
    }

    if (browserWin && showSaveDialog) {
        return showSaveDialog(browserWin)
    }
}

/**
 * Checks to see if there are unsaved changes for the current file.
 * @param markdown Markdown with potential changes from the current file
 * @return True if there are unsaved changes, false otherwise
 */
export const isCurrFileChanged = (markdown: string) => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    return currFile.markdown !== markdown
}

/**
 * Set current file.
 * @param filePath File path for the current file
 * @param markdown Markdown of the current file
 * @param browserWin Electron BrowserWindow instance
 */
export const setCurrFile = (
    filePath: string,
    markdown: string,
    browserWin?: BrowserWindow,
) => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    currFile.filePath = filePath
    currFile.markdown = markdown

    app.addRecentDocument(filePath)

    if (browserWin) {
        browserWin.setTitle(`${basename(filePath)} - ${app.name}`)
        browserWin.setRepresentedFilename(filePath)
    }
}
