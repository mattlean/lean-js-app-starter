import { BrowserWindow, app } from 'electron'
import { basename } from 'path'

interface MdFile {
    /** Contents of the currently open markdown file. */
    markdownSaved: string

    /**
     * File path of the currently open markdown file.
     * The presence of filePath means that a file currently is open.
     * If it is undefined, then no file is currently open.
     */
    filePath?: string
}

/**
 * currFile singleton that keeps track of the currently open markdown file and its contents.
 */
let currFile: MdFile | null = null

/**
 * Setup the currFile singleton.
 */
export const setupCurrFile = () => {
    currFile = {
        markdownSaved: '',
        filePath: undefined,
    }
}

/**
 * Get the current file path.
 * If no file path exists, optionally open the save dialog to save the current markdown
 * source in a file and get a new file path.
 * @param browserWin Electron BrowserWindow instance
 * @param showSaveDialog showSaveDialog function to open the save dialog
 * @return A promise that will resolve to the current file path, or undefined if the
 *     showSaveDialog function cancels or is never called
 */
export const getCurrFilePath = async (
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
 * @param markdownSrc Markdown source with potential changes
 * @return True if there are unsaved changes or false otherwise
 */
export const isCurrFileChanged = (markdownSrc: string) => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    return currFile.markdownSaved !== markdownSrc
}

/**
 * Checks to see if there is a file currently open.
 * @return The file path if there a file is currently open or false otherwise
 */
export const isFileOpen = () => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    if (currFile.filePath) {
        return currFile.filePath
    }
    return false
}

/**
 * Reset the current file.
 */
export const resetCurrFile = () => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    currFile.markdownSaved = ''
    currFile.filePath = undefined
}

/**
 * Set the current open markdown file.
 * @param filePath File path of the currently open markdown file
 * @param markdownSaved Contents of the currently open markdown file
 * @param browserWin Electron BrowserWindow instance
 */
export const setCurrFile = (
    filePath: string,
    markdownSaved: string,
    browserWin?: BrowserWindow,
) => {
    if (!currFile) {
        throw new Error('currFile singleton was not setup.')
    }

    currFile.filePath = filePath
    currFile.markdownSaved = markdownSaved

    app.addRecentDocument(filePath)

    if (browserWin) {
        browserWin.setTitle(`${basename(filePath)} - ${app.name}`)
        browserWin.setRepresentedFilename(filePath)
    }
}
