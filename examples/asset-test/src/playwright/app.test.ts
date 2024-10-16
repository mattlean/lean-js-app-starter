// @ts-check
import { expect, test } from '@playwright/test'

import { loadApp } from './util'

test('has ljas-asset-test title', async ({ page }) => {
    await loadApp(page)

    await expect(page).toHaveTitle(/ljas-asset-test/i)
})
