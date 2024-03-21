import {
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    app,
    shell,
} from 'electron'

import {
    saveFileMain,
    showExportHtmlDialogMain,
    showInFolderMain,
    syncColorModeBtn,
    toggleFocusMode,
} from './mse'
// import setColorModeMenu from './setColorModeMenu'
import showOpenFileDialog from './showOpenFileDialog'
import { createWindow } from './window'

console.log('huh')

/**
 * Setup the menu.
 */
export const setupMenu = () => {
    const viewSubmenu: MenuItemConstructorOptions[] = [
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { type: 'separator' },
        {
            label: 'Toggle Focus Mode',
            click: () => toggleFocusMode(),
        },
        {
            id: 'color-mode',
            label: 'Color Mode',
            submenu: [
                {
                    // id: 'auto',
                    label: 'Use System Preference',
                    checked: true,
                    type: 'checkbox',
                    // click: () => {
                    //     // setColorModeMenu('auto')
                    //     // syncColorModeBtn('auto')
                    // },
                },
                {
                    id: 'light',
                    label: 'Light Mode',
                    type: 'checkbox',
                    // click: () => {
                    //     // setColorModeMenu('light')
                    //     // syncColorModeBtn('light')
                    // },
                },
                {
                    // id: 'dark',
                    label: 'Dark Mode',
                    type: 'checkbox',
                    // click: () => {
                    //     // setColorModeMenu('dark')
                    //     // syncColorModeBtn('dark')
                    // },
                },
            ],
        },
    ]

    if (process.env.NODE_ENV === 'development') {
        viewSubmenu.unshift(
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
        )
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
                { type: 'separator' },
                {
                    label: 'Save',
                    click: () => saveFileMain(),
                    accelerator: 'CmdOrCtrl+S',
                },
                { type: 'separator' },
                {
                    label: 'Export as HTML',
                    click: () => showExportHtmlDialogMain(),
                },
                { type: 'separator' },
                {
                    label: 'Show In Folder',
                    click: () => showInFolderMain(),
                },
                { type: 'separator' },
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
                    click: () =>
                        shell.openExternal(
                            'http://github.com/mattlean/lean-js-app-starter',
                        ),
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
