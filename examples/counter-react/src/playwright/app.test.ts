// @ts-check
import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has ljas-counter-react title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/ljas-counter-react/i);
});
