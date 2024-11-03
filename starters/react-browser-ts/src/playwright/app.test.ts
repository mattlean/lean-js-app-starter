// @ts-check
import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has ljas-react-browser-ts title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/ljas-react-browser-ts/i);
});
