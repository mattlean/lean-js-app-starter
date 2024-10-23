// @ts-check
import { expect, test } from '@playwright/test'

import { loadApp } from './util'

test('has ljas-basic-browser-ts title', async ({ page }) => {
    await loadApp(page)

    await expect(page).toHaveTitle(/ljas-basic-browser-ts/i)
})
