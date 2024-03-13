import { BrowserWindow, Menu, MenuItemConstructorOptions, app } from 'electron'

import { showOpenFileDialog } from './api'
import { createWindow } from './window'

/**
 * Setup the menu.
 */
export const setupMenu = () => {
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
            ],
        },
        { label: 'Edit', role: 'editMenu' },
    ]

    if (process.platform === 'darwin') {
        template.unshift({ label: app.name, role: 'appMenu' })
    }
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
