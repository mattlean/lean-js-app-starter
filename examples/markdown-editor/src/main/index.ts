import 'dotenv/config'
import { BrowserWindow, app } from 'electron'
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer'

import { setupCurrFile } from './currFile'
import { setupApi } from './interfaces/api'
import { setupMenu } from './menu'
import { createWindow } from './window'

setupCurrFile()

app.whenReady().then(() => {
    setupMenu()
    setupApi()

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
