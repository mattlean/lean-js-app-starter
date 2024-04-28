import { BrowserWindow, app } from 'electron'
import { shell } from 'electron'
import path from 'path'

import { resetCurrFile } from './currFile'
import { closeWindowStart } from './interfaces/mse'

const BUNDLED_PRELOAD_BUILD_PATH = path.join(__dirname, '../preload')
const BUNDLED_RENDERER_BUILD_PATH = path.join(__dirname, '../renderer')
const BUNDLED_LOGO_PATH = path.resolve(__dirname, 'logo.png')

/**
 * Create BrowserWindow instance that renders the UI for the markdown editor.
 */
export const createWindow = () => {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        show: false,
        webPreferences: {
            preload: `${BUNDLED_PRELOAD_BUILD_PATH}/preload.js`,
        },
    })

    if (process.platform === 'darwin') {
        app.dock.setIcon(BUNDLED_LOGO_PATH)
    } else {
        win.setIcon(BUNDLED_LOGO_PATH)
    }

    win.loadFile(`${BUNDLED_RENDERER_BUILD_PATH}/index.html`)

    win.once('ready-to-show', () => {
        win.setTitle(`untitled - ${app.name}`)
        win.show()
        win.focus()
    })

    win.on('close', (e) => {
        // Prevent window from closing and have renderer process determine if the unsaved
        // changes dialog should appear or if the window should skip straight to closing
        e.preventDefault()
        closeWindowStart(win)
    })

    win.on('closed', () => {
        // "Close" currently open file when window is closed
        resetCurrFile()
    })

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: 'deny' } // Prevent Electron from opening the URL
    })

    return win
}
