import { expect, test } from '@playwright/test'

import { launchElectron, resetColorMode } from './util'

test('app loads initial screen', async () => {
    const electronApp = await launchElectron()
    const window = await electronApp.firstWindow()

    await resetColorMode(window)

    await expect(window).toHaveTitle('ljas-markdown-editor')

    // Perform visual comparison of initial screen
    await expect(window).toHaveScreenshot('initial-screen.png')

    await electronApp.close()
})
