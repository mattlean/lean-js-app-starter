import { expect, test } from "@playwright/test";

import { launchElectron } from "./util";

test("start html export process from html export menu item", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  // Mock HTML export process and return handle to htmlExportDialogCalls
  const handle = await electronApp.evaluateHandle(async ({ ipcMain }) => {
    const result = { htmlExportDialogCalls: 0 };

    ipcMain.removeAllListeners("htmlexportdialog");
    ipcMain.on("htmlexportdialog", () => {
      result.htmlExportDialogCalls += 1;
    });

    return result;
  });

  // Access handle's htmlExportDialogCalls property
  let calls = await handle.evaluate(
    ({ htmlExportDialogCalls }) => htmlExportDialogCalls,
  );

  // Expect calls to start with 0
  expect(calls).toBe(0);

  // Expect editor & preview to be visible to make sure frontend is loaded
  await expect(window.getByRole("textbox")).toBeVisible();
  await expect(window.getByRole("article")).toBeVisible();

  // Click the HTML export menu item
  await electronApp.evaluate(({ BrowserWindow, Menu }) => {
    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      throw new Error("Application menu could not be found.");
    }

    const htmlExportMenuItem = appMenu.getMenuItemById("html-export");

    if (!htmlExportMenuItem) {
      throw new Error("Open file menu item could not be found.");
    }

    htmlExportMenuItem.click(undefined, BrowserWindow.getAllWindows()[0]);
  });

  // Access handle's htmlExportDialogCalls property again to see if it has changed
  calls = await handle.evaluate(
    ({ htmlExportDialogCalls }) => htmlExportDialogCalls,
  );

  // Expect calls to now be 1 to assert that HTML export process was initiated
  expect(calls).toBe(1);

  await electronApp.close();
});
