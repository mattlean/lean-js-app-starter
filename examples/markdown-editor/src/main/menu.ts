import { Menu, MenuItemConstructorOptions, app, shell } from 'electron'

import { colorModes } from '../common/types'
import {
    saveFileMain,
    sendMainErrorMessage,
    showFileOpenDialogMain,
    showHtmlExportDialogMain,
    syncColorModeBtn,
    toggleFocusMode,
} from './interfaces/mse'
import { showInFolder } from './open'
import { createWindow } from './window'

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
            id: 'focus-mode',
            label: 'Toggle Focus Mode',
            click: (_, win) => toggleFocusMode(win),
        },
        {
            id: 'color-mode',
            label: 'Color Mode',
            submenu: [
                {
                    id: 'sysPref',
                    label: 'Use System Preference',
                    checked: true,
                    type: 'checkbox',
                    click: (_, win) => {
                        setColorModeMenu('sysPref')
                        syncColorModeBtn('sysPref', win)
                    },
                },
                {
                    id: 'light',
                    label: 'Light Mode',
                    type: 'checkbox',
                    click: (_, win) => {
                        setColorModeMenu('light')
                        syncColorModeBtn('light', win)
                    },
                },
                {
                    id: 'dark',
                    label: 'Dark Mode',
                    type: 'checkbox',
                    click: (_, win) => {
                        setColorModeMenu('dark')
                        syncColorModeBtn('dark', win)
                    },
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
                    click: (_, win) => {
                        if (!win) {
                            win = createWindow()
                        }

                        showFileOpenDialogMain(win)
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
                    click: () => showHtmlExportDialogMain(),
                },
                { type: 'separator' },
                {
                    label: 'Show In Folder',
                    click: () => showInFolder(),
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

/**
 * Set the color mode in the color mode menu.
 * @param colorMode Color mode type that determines which color mode to use
 */
const setColorModeMenu = (colorMode: colorModes) => {
    const appMenu = Menu.getApplicationMenu()

    if (!appMenu) {
        sendMainErrorMessage(new Error('Application menu could not be found.'))
        return
    }

    const colorModeMenuItem = appMenu.getMenuItemById('color-mode')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        sendMainErrorMessage(new Error('Color mode menu could not be found.'))
        return
    }

    colorModeMenuItem.submenu.items.forEach((item) => {
        if (colorMode === item.id) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
}

export default setColorModeMenu
