import { _electron as electron, expect, test } from '@playwright/test'

import {
    MOCK_BARBAZ_FILE_CONTENT,
    MOCK_FOOBAR_FILE_CONTENT,
} from '../common/MOCK_DATA'
import { disableUnsavedChangesDialog } from './util'

test('markdown in editor generates HTML in preview', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    const editor = window.getByRole('textbox')
    const preview = window.getByRole('article')

    // Expect the editor to start focused
    await expect(editor).toBeFocused()

    // Type markdown in the editor
    await editor.fill(MOCK_FOOBAR_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(
        window.getByRole('heading', { name: /hello world/i }),
    ).toBeVisible()
    await expect(preview.getByText(/foobar!/i)).toBeVisible()

    // Perform visual comparison of UI with some content in the editor and preview
    await expect(window).toHaveScreenshot('editor-preview-basic.png')

    await electronApp.close()
})

test('standard markdown in editor generates HTML in preview', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    const editor = window.getByRole('textbox')
    const preview = window.getByRole('article')

    // Expect the editor to start focused
    await expect(editor).toBeFocused()

    // Type markdown in the editor
    await editor.fill(MOCK_BARBAZ_FILE_CONTENT)

    // Expect the correct HTML to be generated in the preview
    await expect(preview.getByRole('strong')).toHaveCount(4)
    await expect(preview.getByRole('emphasis')).toHaveCount(3)
    await expect(preview.getByRole('blockquote')).toHaveCount(4)
    await expect(preview.getByRole('listitem')).toHaveCount(14)
    await expect(preview.getByRole('code')).toHaveCount(1)
    await expect(preview.getByRole('separator')).toHaveCount(1)
    await expect(preview.getByRole('link')).toHaveCount(4)

    // Perform visual comparison of UI with some content in the editor and preview
    await expect(window).toHaveScreenshot('editor-preview-standard.png')

    await electronApp.close()
})

test('extended markdown in editor generates HTML in preview', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await disableUnsavedChangesDialog(electronApp)

    const editor = window.getByRole('textbox')
    const preview = window.getByRole('article')

    // Expect the editor to start focused
    await expect(editor).toBeFocused()

    // Type markdown in the editor
    await window.getByRole('textbox').fill(`# Extended Markdown Test

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

## Tasklist

* [ ] to do
* [x] done`)

    // Expect the correct HTML to be generated in the preview
    await expect(preview.getByRole('link')).toHaveCount(5)
    await expect(preview.getByRole('deletion')).toHaveCount(2)
    await expect(preview.getByRole('table')).toHaveCount(1)
    await expect(preview.getByRole('list')).toHaveCount(2)

    // Perform visual comparison of UI with some content in the editor and preview
    await expect(window).toHaveScreenshot('editor-preview-extended.png')

    await electronApp.close()
})
