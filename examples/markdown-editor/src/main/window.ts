import { BrowserWindow, app } from 'electron'
import { shell } from 'electron'
import path from 'path'

import { resetCurrFile } from './currFile'

const BUNDLED_PRELOAD_BUILD_PATH = path.join(__dirname, '../preload')
const BUNDLED_RENDERER_BUILD_PATH = path.join(__dirname, '../renderer')

/**
 * Create BrowserWindow instance that renders the UI for the markdown editor.
 */
export const createWindow = () => {
    if (process.platform === 'darwin') {
        app.dock.setIcon(path.resolve(__dirname, 'logo.png'))
    }

    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        icon: path.resolve(__dirname, 'logo.png'),
        show: false,
        webPreferences: {
            preload: `${BUNDLED_PRELOAD_BUILD_PATH}/preload.js`,
        },
    })

    win.loadFile(`${BUNDLED_RENDERER_BUILD_PATH}/index.html`)

    win.once('ready-to-show', () => {
        win.setTitle(`untitled - ${app.name}`)
        win.show()
        win.focus()
    })

    win.on('closed', () => {
        resetCurrFile()
    })

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: 'deny' } // Prevent Electron from opening the URL
    })

    return win
}
