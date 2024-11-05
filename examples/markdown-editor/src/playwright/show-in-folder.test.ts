import { expect, test } from "@playwright/test";

import {
  MOCK_FOOBAR_FILE_CONTENT,
  MOCK_FOOBAR_FILE_PATH,
} from "../common/MOCK_DATA";
import {
  launchElectron,
  mockOpenFileSuccess,
  skipUnsavedChangesDialog,
} from "./util";

test("start show in folder process from show in folder menu item", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  // Mock show in folder process
  await electronApp.evaluate(({ ipcMain }) => {
    ipcMain.removeAllListeners("folderopen");
  });

  // Expect show in folder button to be visible once frontend has loaded
  await expect(
    window.getByRole("button", {
      name: /show in folder/i,
    }),
  ).toBeDisabled();

  // Click the show in folder menu item
  const showInFolderResult = await electronApp.evaluate(({ Menu }) => {
    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      throw new Error("Application menu could not be found.");
    }

    const showInFolderMenuItem = appMenu.getMenuItemById("show-in-folder");

    if (!showInFolderMenuItem) {
      throw new Error("Open file menu item could not be found.");
    }

    showInFolderMenuItem.click();
    return true;
  });

  expect(showInFolderResult).toBe(true);

  await electronApp.close();
});

test("show in folder button is disabled when no file is open", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  // Expect show in folder button to default to disabled
  await expect(
    window.getByRole("button", {
      name: /show in folder/i,
    }),
  ).toBeDisabled();

  await electronApp.close();
});

test("show in folder button becomes enabled after file is opened", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await skipUnsavedChangesDialog(electronApp);

  await mockOpenFileSuccess(
    electronApp,
    MOCK_FOOBAR_FILE_PATH,
    MOCK_FOOBAR_FILE_CONTENT,
  );

  const showInFolderBtn = window.getByRole("button", {
    name: /show in folder/i,
  });

  // Expect show in folder button to default to disabled
  await expect(showInFolderBtn).toBeDisabled();

  // Click open file button
  await window.getByRole("button", { name: /open file/i }).click();

  // Expect show in folder button to become enabled
  await expect(showInFolderBtn).toBeEnabled();

  await electronApp.close();
});
