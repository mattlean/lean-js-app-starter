import { expect, test } from "@playwright/test";

import { launchElectron } from "./util";

test("has ljas-react-electron-ts title", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await expect(window).toHaveTitle(/ljas-react-electron-ts/i);
});
