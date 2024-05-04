import { expect, test } from '@playwright/test'

import { loadApp } from './util'

test('has starchan title', async ({ page }) => {
    await loadApp({ page })

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/starchan/i)
})

test('navigates to Lean JavaScript Application Starter repository when GitHub link is clicked', async ({
    page,
}) => {
    await loadApp({ page })

    // Click the get started link.
    await page
        .getByRole('link', { name: 'Lean JavaScript Application Starter' })
        .click()

    // Expects page to have a heading with the name of Installation.
    await expect(
        page.getByRole('heading', {
            name: 'Lean JavaScript Application Starter',
        }),
    ).toBeVisible()
})
