import { _electron as electron, expect, test } from '@playwright/test'

import { PATH_PLAYWRIGHT_SRC } from '../../PATHS'

test('App loads first screen', async () => {
    const electronApp = await electron.launch({ args: ['.'] })

    const window = await electronApp.firstWindow()

    await expect(window).toHaveTitle('ljas-markdown-editor')
    await window.screenshot({ path: `${PATH_PLAYWRIGHT_SRC}/first-screen.png` })

    await electronApp.close()
})
