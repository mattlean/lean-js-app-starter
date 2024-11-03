import { expect, test } from "@playwright/test";

import { loadApp } from "./util";

test("has ljas-react-express-postgres-ssr-ts title", async ({ page }) => {
  await loadApp(page);

  await expect(page).toHaveTitle(/ljas-react-express-postgres-ssr-ts/i);
});
