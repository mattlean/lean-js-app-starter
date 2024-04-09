import { _electron as electron, expect, test } from '@playwright/test'

test('App loads initial screen', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    await expect(window).toHaveTitle('ljas-markdown-editor')

    // Perform visual comparison of initial screen
    await expect(window).toHaveScreenshot('initial-screen.png')

    await electronApp.close()
})
