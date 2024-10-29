// @ts-check
import { expect, test } from '@playwright/test'

import { loadApp } from './util'

test('has ljas-tic-tac-toe title', async ({ page }) => {
    await loadApp(page)

    await expect(page).toHaveTitle(/ljas-tic-tac-toe/i)
})
