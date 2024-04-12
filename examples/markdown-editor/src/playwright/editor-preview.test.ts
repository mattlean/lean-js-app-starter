import { _electron as electron, expect, test } from '@playwright/test'

import { MOCK_FOOBAR_FILE_CONTENT } from '../common/MOCK_DATA'
import { disableUnsavedChangesDialog } from './util'

test('markdown in editor generates HTML in preview', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    const preview = window.getByRole('article')

    // Type markdown in the editor
    await window.getByRole('textbox').fill(MOCK_FOOBAR_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    await expect(preview.getByText(/foobar!/i)).toBeVisible()

    // Perform visual comparison of UI with some content in the editor and preview
    await expect(window).toHaveScreenshot('editor-preview.png')

    await electronApp.close()
})
