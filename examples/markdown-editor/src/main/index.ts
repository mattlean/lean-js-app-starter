import 'dotenv/config'
import { BrowserWindow, app, dialog, ipcMain } from 'electron'
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'
import { readFile } from 'node:fs/promises'
import path from 'path'

const BUNDLED_PRELOAD_BUILD_PATH = path.join(__dirname, '../preload')

const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
    const content = await readFile(filePath, { encoding: 'utf-8' })

    browserWindow.webContents.send('file-opened', content, filePath)
}

const showOpenDialog = async (browserWindow: BrowserWindow) => {
    const result = await dialog.showOpenDialog(browserWindow, {
        properties: ['openFile'],
        filters: [{ name: 'Markdown File', extensions: ['md'] }],
    })

    if (result.canceled) {
        return
    }

    const [filePath] = result.filePaths

    openFile(browserWindow, filePath)
}

ipcMain.on('show-open-dialog', (event) => {
    console.log('show-open-dialog heard')
    const browserWindow = BrowserWindow.fromWebContents(event.sender)

    if (!browserWindow) {
        return
    }

    showOpenDialog(browserWindow)
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
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
        win.show()
        win.focus()
    })

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools({ mode: 'detach' })
    }
}

app.whenReady().then(() => {
    if (process.env.NODE_ENV === 'development') {
        installExtension(REACT_DEVELOPER_TOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err))
    }

    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
