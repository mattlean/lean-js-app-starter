import { Menu, MenuItemConstructorOptions, app, dialog, shell } from 'electron'

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
 * Build the menu template.
 * @returns The Electron application menu
 */
export const buildMenuTemplate = () => {
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
                    id: 'open',
                    label: 'Open...',
                    click: (_, win) => {
                        if (!win) {
                            win = createWindow()
                        }

                        showFileOpenDialogMain(win)
                    },
                    accelerator: 'CmdOrCtrl+O',
                },
                // TODO: Figure out why this doesn't work.
                // {
                //     label: 'Open Recent',
                //     role: 'recentDocuments',
                //     submenu: [
                //         { label: 'Clear Recent', role: 'clearRecentDocuments' },
                //     ],
                // },
                { type: 'separator' },
                {
                    id: 'save',
                    label: 'Save',
                    click: (_, win) => saveFileMain(win),
                    accelerator: 'CmdOrCtrl+S',
                },
                { type: 'separator' },
                {
                    id: 'html-export',
                    label: 'Export as HTML',
                    click: (_, win) => showHtmlExportDialogMain(win),
                },
                { type: 'separator' },
                {
                    id: 'show-in-folder',
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
                    label: 'Tech stack info',
                    click: () =>
                        dialog.showMessageBox({
                            message:
                                'This project was built with the following technologies:\n\n• TypeScript\n• Electron\n• React\n• unified, rehype, remark\n• Tailwind CSS\n• Lean JavaScript Application Starter',
                        }),
                },
                {
                    label: 'ljas-markdown-editor GitHub Repo',
                    click: () =>
                        shell.openExternal(
                            'https://github.com/mattlean/lean-js-app-starter/tree/master/examples/markdown-editor',
                        ),
                },
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

    return Menu.buildFromTemplate(template)
}

/**
 * Set the color mode in the color mode menu.
 * @param colorMode Color mode type that determines which color mode to use
 */
const setColorModeMenu = (colorMode: colorModes) => {
    const appMenu = Menu.getApplicationMenu()

    if (!appMenu) {
        sendMainErrorMessage('Application menu could not be found.')
        return
    }

    const colorModeMenuItem = appMenu.getMenuItemById('color-mode')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        sendMainErrorMessage('Color mode menu could not be found.')
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
