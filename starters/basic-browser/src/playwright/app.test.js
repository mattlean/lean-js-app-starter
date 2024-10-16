// @ts-check
import { expect, test } from '@playwright/test'

import { loadApp } from './util'

test('has ljas-basic-browser title', async ({ page }) => {
    await loadApp(page)

    await expect(page).toHaveTitle(/ljas-basic-browser/i)
})
