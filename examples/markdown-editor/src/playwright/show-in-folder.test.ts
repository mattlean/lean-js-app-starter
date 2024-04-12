import { _electron as electron, expect, test } from '@playwright/test'

import {
    MOCK_FOOBAR_FILE_CONTENT,
    MOCK_FOOBAR_FILE_PATH,
} from '../common/MOCK_DATA'
import { disableUnsavedChangesDialog } from './util'

test('show in folder button is disabled when no file is open', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    // Expect show in folder to default to disabled
    await expect(
        window.getByRole('button', {
            name: /show in folder/i,
        }),
    ).toBeDisabled()

    await electronApp.close()
})

test('show in folder button becomes enabled after file is opened', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    // Mock open file dialog with successful file open
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

    // Expect show in folder to default to disabled
    await expect(
        window.getByRole('button', {
            name: /show in folder/i,
        }),
    ).toBeDisabled()

    // Click open file button
    await window.getByRole('button', { name: /open file/i }).click()

    // Expect show in folder to become enabled
    await expect(
        window.getByRole('button', {
            name: /show in folder/i,
        }),
    ).toBeEnabled()

    await electronApp.close()
})
