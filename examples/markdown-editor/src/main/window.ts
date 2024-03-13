import { BrowserWindow, app } from 'electron'
import path from 'path'

const BUNDLED_PRELOAD_BUILD_PATH = path.join(__dirname, '../preload')

/**
 * Create Electron BrowserWindow instance that renders the UI for the markdown editor.
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

    if (process.env.NODE_ENV === 'development' && process.env.HOST_DEV_SERVER) {
        win.loadURL(process.env.HOST_DEV_SERVER)
    } else {
        win.loadFile('build/renderer/index.html')
    }

    win.once('ready-to-show', () => {
        win.setTitle(`untitled - ${app.name}`)
        win.show()
        win.focus()
    })

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools({ mode: 'detach' })
    }

    return win
}
