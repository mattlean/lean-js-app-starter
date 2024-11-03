import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has ljas-starchan title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/ljas-starchan/i);
});

test("navigates to Lean JavaScript Application Starter repository when GitHub link is clicked", async ({
  page,
}) => {
  await loadApp(page);

  await page
    .getByRole("link", { name: "Lean JavaScript Application Starter" })
    .click();

  await expect(
    page.getByRole("heading", {
      name: "Lean JavaScript Application Starter",
    }),
  ).toBeVisible();
});
