import { ElectronApplication, expect, test } from "@playwright/test";

import {
  MOCK_FOOBAR_FILE_CONTENT,
  MOCK_FOOBAR_FILE_PATH,
} from "../common/MOCK_DATA";
import {
  launchElectron,
  mockOpenFileSuccess,
  skipUnsavedChangesDialog,
} from "./util";

/**
 * Click the save menu item.
 * @param electronApp Electron application representation
 */
const clickSaveMenuItem = (electronApp: ElectronApplication) =>
  electronApp.evaluate(({ BrowserWindow, Menu }) => {
    const appMenu = Menu.getApplicationMenu();

    if (!appMenu) {
      throw new Error("Application menu could not be found.");
    }

    const saveMenuItem = appMenu.getMenuItemById("save");

    if (!saveMenuItem) {
      throw new Error("Open file menu item could not be found.");
    }

    saveMenuItem.click(undefined, BrowserWindow.getAllWindows()[0]);
  });

/**
 * Mock successful save file process.
 * @param electronApp Electron application representation
 */
const mockSaveFileSuccess = (electronApp: ElectronApplication) =>
  electronApp.evaluate(({ ipcMain, BrowserWindow }) => {
    ipcMain.removeAllListeners("markdownsave");
    ipcMain.once("markdownsave", async (e) => {
      const browserWin = BrowserWindow.fromWebContents(e.sender);

      if (!browserWin) {
        throw new Error("BrowserWindow instance could not be found.");
      }

      browserWin.webContents.send("markdownsavesuccess");
    });
  });

test("save new file from save menu item", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await skipUnsavedChangesDialog(electronApp);

  await mockSaveFileSuccess(electronApp);

  const saveBtn = window.getByRole("button", {
    name: /save/i,
  });

  // Expect save button to default to disabled
  await expect(saveBtn).toBeDisabled();

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Expect save button to become enabled
  await expect(saveBtn).toBeEnabled();

  await clickSaveMenuItem(electronApp);

  // Expect save button to return to disabled
  await expect(saveBtn).toBeDisabled();

  await electronApp.close();
});

test("save new file from save file button", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await skipUnsavedChangesDialog(electronApp);

  await mockSaveFileSuccess(electronApp);

  const saveBtn = window.getByRole("button", {
    name: /save/i,
  });

  // Expect save button to default to disabled
  await expect(saveBtn).toBeDisabled();

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Expect save button to become enabled
  await expect(saveBtn).toBeEnabled();

  // Click the save button
  await saveBtn.click();

  // Expect save button to return to disabled
  await expect(saveBtn).toBeDisabled();

  await electronApp.close();
});

test("save changes to an existing file", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await skipUnsavedChangesDialog(electronApp);

  await mockOpenFileSuccess(
    electronApp,
    MOCK_FOOBAR_FILE_PATH,
    MOCK_FOOBAR_FILE_CONTENT,
  );

  await mockSaveFileSuccess(electronApp);

  const saveBtn = window.getByRole("button", {
    name: /save/i,
  });

  // Expect save button to default to disabled
  await expect(saveBtn).toBeDisabled();

  // Click open file button
  await window.getByRole("button", { name: /open file/i }).click();

  // Expect save button to remain disabled
  await expect(saveBtn).toBeDisabled();

  // Change markdown in editor from markdown file source
  await window.getByRole("textbox").press("f");

  // Expect save button to become enabled
  await expect(saveBtn).toBeEnabled();

  await clickSaveMenuItem(electronApp);

  // Expect save button to return to disabled
  await expect(saveBtn).toBeDisabled();

  await electronApp.close();
});

test("cancel save file dialog", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await skipUnsavedChangesDialog(electronApp);

  // Mock save file dialog with cancel action
  await electronApp.evaluate(({ ipcMain }) => {
    ipcMain.removeAllListeners("markdownsave");
  });

  const saveBtn = window.getByRole("button", {
    name: /save/i,
  });

  // Expect save button to default to disabled
  await expect(saveBtn).toBeDisabled();

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Expect save button to become enabled
  await expect(saveBtn).toBeEnabled();

  await clickSaveMenuItem(electronApp);

  // Expect save button to remain enabled because save was "cancelled"
  await expect(saveBtn).toBeEnabled();

  await electronApp.close();
});
