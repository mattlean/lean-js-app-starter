import { _electron as electron, expect, test } from '@playwright/test'

test('Markdown in editor generates HTML in preview', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await electronApp.evaluate(({ ipcMain }) => {
        ipcMain.removeAllListeners('unsavedchangesdialog')
        ipcMain.on('unsavedchangesdialog', async (e) => {
            // Disable unsaved changes dialog so the test can exit without interruption
            e.returnValue = { response: 1, checkboxChecked: false }
        })
    })

    const preview = window.getByRole('article')
    // TODO: mock code so unsaved changes dialog doesn't pop up

    // Type markdown in the editor
    await window.getByRole('textbox').fill('# Hello World\nFoobar!')

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    expect(preview.getByText(/foobar!/i)).toBeVisible()

    // Perform visual comparison of UI with some content in the editor and preview
    await expect(window).toHaveScreenshot('editor-preview.png')

    await electronApp.close()
})
