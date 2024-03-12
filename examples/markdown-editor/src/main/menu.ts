import { BrowserWindow, Menu, MenuItemConstructorOptions, app } from 'electron'

import { showOpenFileDialog } from './api'
import { createWindow } from './window'

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
                },
            ],
        },
    ]

    if (process.platform === 'darwin') {
        template.unshift({ label: app.name })
    }
    const menu = Menu.buildFromTemplate(template)
    // Menu.setApplicationMenu(menu)
}
