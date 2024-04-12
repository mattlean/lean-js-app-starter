import {
    ElectronApplication,
    _electron as electron,
    expect,
    test,
} from '@playwright/test'

import {
    MOCK_BARBAZ_FILE_CONTENT,
    MOCK_BARBAZ_FILE_PATH,
    MOCK_FOOBAR_FILE_CONTENT,
    MOCK_FOOBAR_FILE_PATH,
} from '../common/MOCK_DATA'
import { disableUnsavedChangesDialog } from './util'

/**
 * Click the open file menu item.
 * @param electronApp Electron application representation
 */
const clickOpenFileMenuItem = async (electronApp: ElectronApplication) =>
    electronApp.evaluate(({ BrowserWindow, Menu }) => {
        const appMenu = Menu.getApplicationMenu()

        if (!appMenu) {
            throw new Error('Application menu could not be found.')
        }

        const openFileMenuItem = appMenu.getMenuItemById('open')

        if (!openFileMenuItem) {
            throw new Error('Open file menu item could not be found.')
        }

        openFileMenuItem.click(undefined, BrowserWindow.getAllWindows()[0])
    })

test('show open file dialog from open file menu', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    // Mock open file dialog to successfully open file
    await electronApp.evaluate(
        (
            { ipcMain, BrowserWindow },
            { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
        ) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const win = BrowserWindow.fromWebContents(e.sender)

                if (!win) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                win.webContents.send(
                    'markdownopensuccess',
                    MOCK_FOOBAR_FILE_PATH,
                    MOCK_FOOBAR_FILE_CONTENT,
                )
            })
        },
        { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
    )

    const editor = window.getByRole('textbox')
    const article = window.getByRole('article')

    // Expect editor and preview to start empty
    await expect(editor).toHaveText('')
    await expect(article).toHaveText('')

    await clickOpenFileMenuItem(electronApp)

    // Expect the editor to be populated with the file content
    await expect(editor).toHaveText(MOCK_FOOBAR_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    await expect(article.getByText(/foobar!/i)).toBeVisible()

    await electronApp.close()
})

test('show open file dialog from open file button', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    // Mock open file dialog to successfully open file
    await electronApp.evaluate(
        (
            { ipcMain, BrowserWindow },
            { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
        ) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const win = BrowserWindow.fromWebContents(e.sender)

                if (!win) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                win.webContents.send(
                    'markdownopensuccess',
                    MOCK_FOOBAR_FILE_PATH,
                    MOCK_FOOBAR_FILE_CONTENT,
                )
            })
        },
        { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
    )

    const editor = window.getByRole('textbox')
    const article = window.getByRole('article')

    // Expect editor and preview to start empty
    await expect(editor).toHaveText('')
    await expect(article).toHaveText('')

    // Click open file button
    await window.getByRole('button', { name: /open file/i }).click()

    // Expect the editor to be populated with the file content
    await expect(editor).toHaveText(MOCK_FOOBAR_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    await expect(article.getByText(/foobar!/i)).toBeVisible()

    await electronApp.close()
})

test('cancel open file dialog', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    // Mock open file dialog with cancel action
    await electronApp.evaluate(({ ipcMain }) => {
        ipcMain.removeAllListeners('markdownopendialog')
    })

    const editor = window.getByRole('textbox')
    const article = window.getByRole('article')

    // Expect editor and preview to start empty
    await expect(editor).toHaveText('')
    await expect(article).toHaveText('')

    await clickOpenFileMenuItem(electronApp)

    // Expect editor and preview to remain empty
    await expect(editor).toHaveText('')
    await expect(article).toHaveText('')

    await electronApp.close()
})

test('open different file while a file is currently open', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    // Mock open file dialog to successfully open first file
    await electronApp.evaluate(
        (
            { ipcMain, BrowserWindow },
            { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
        ) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const win = BrowserWindow.fromWebContents(e.sender)

                if (!win) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                win.webContents.send(
                    'markdownopensuccess',
                    MOCK_FOOBAR_FILE_PATH,
                    MOCK_FOOBAR_FILE_CONTENT,
                )
            })
        },
        { MOCK_FOOBAR_FILE_CONTENT, MOCK_FOOBAR_FILE_PATH },
    )

    const editor = window.getByRole('textbox')
    const article = window.getByRole('article')

    // Expect editor and preview to start empty
    await expect(editor).toHaveText('')
    await expect(article).toHaveText('')

    await clickOpenFileMenuItem(electronApp)

    // Expect the editor to be populated with the first file content
    await expect(editor).toHaveText(MOCK_FOOBAR_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    await expect(article.getByText(/foobar!/i)).toBeVisible()

    // Mock open file dialog to successfully open second file
    await electronApp.evaluate(
        (
            { ipcMain, BrowserWindow },
            { MOCK_BARBAZ_FILE_CONTENT, MOCK_BARBAZ_FILE_PATH },
        ) => {
            ipcMain.removeAllListeners('markdownopendialog')
            ipcMain.once('markdownopendialog', async (e) => {
                const win = BrowserWindow.fromWebContents(e.sender)

                if (!win) {
                    throw new Error(
                        'BrowserWindow instance could not be found.',
                    )
                }

                win.webContents.send(
                    'markdownopensuccess',
                    MOCK_BARBAZ_FILE_PATH,
                    MOCK_BARBAZ_FILE_CONTENT,
                )
            })
        },
        { MOCK_BARBAZ_FILE_CONTENT, MOCK_BARBAZ_FILE_PATH },
    )

    await clickOpenFileMenuItem(electronApp)

    // Expect the editor to be populated with the second file content
    await expect(editor).toHaveText(MOCK_BARBAZ_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /standard markdown test/i }),
    ).toBeVisible()
    await expect(article.getByText(/bar/i)).toBeVisible()
    await expect(article.getByText(/baz/i)).toBeVisible()

    await electronApp.close()
})
