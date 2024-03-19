import {
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    app,
    shell,
} from 'electron'

import { showOpenFileDialog } from './api'
import { saveFileMain, toggleFocusMode } from './mse'
import { createWindow } from './window'

/**
 * Setup the menu.
 */
export const setupMenu = () => {
    const viewSubmenu: MenuItemConstructorOptions[] = [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        {
            label: 'Toggle Focus Mode',
            click: () => {
                toggleFocusMode()
            },
        },
    ]

    if (process.env.NODE_ENV === 'development') {
        viewSubmenu.splice(2, 0, { role: 'toggleDevTools' })
    }

    const template: MenuItemConstructorOptions[] = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    click: () => {
                        let browserWin = BrowserWindow.getFocusedWindow()
                        if (!browserWin) {
                            browserWin = createWindow()
                        }

                        showOpenFileDialog(browserWin)
                    },
                    accelerator: 'CmdOrCtrl+O',
                },
                {
                    label: 'Save',
                    click: () => {
                        saveFileMain()
                    },
                    accelerator: 'CmdOrCtrl+S',
                },
                { label: 'Close Window', role: 'close' },
            ],
        },
        { label: 'Edit', role: 'editMenu' },
        { label: 'View', submenu: viewSubmenu },
        { label: 'Window', role: 'windowMenu' },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Lean JavaScript Application Starter',
                    click: () => {
                        shell.openExternal(
                            'http://github.com/mattlean/lean-js-app-starter',
                        )
                    },
                },
            ],
        },
    ]

    if (process.platform === 'darwin') {
        template.unshift({ label: app.name, role: 'appMenu' })
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
