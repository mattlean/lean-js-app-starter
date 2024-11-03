import { ElectronApplication, expect, test } from "@playwright/test";

import {
  MOCK_FOOBAR_FILE_CONTENT,
  MOCK_FOOBAR_FILE_PATH,
} from "../common/MOCK_DATA";
import { exitTypes } from "../common/types";
import {
  launchElectron,
  mockOpenFileSuccess,
  skipUnsavedChangesDialog,
} from "./util";

/**
 * Get the Electron BrowserWindow instance.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve a JSHandle that refers to the Electron BrowserWindow instance
 */
const getBrowserWindow = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ BrowserWindow }) => {
    const browserWin = BrowserWindow.getAllWindows()[0];

    if (!browserWin) {
      throw new Error("BrowserWindow instance could not be found.");
    }

    return browserWin;
  });

/**
 * Add a listener on the "appquitend" and "windowcloseend" channels to keep track if the window
 * has closed or not.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve a JSHandle that refers to a boolean that tracks whether
 *     or not the window is closed
 */
const isWindowClosed = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ app, ipcMain }) => {
    const handle = { isClosed: false };

    ipcMain.prependListener("appquitend", () => {
      handle.isClosed = true;
    });

    ipcMain.prependListener("windowcloseend", () => {
      handle.isClosed = true;
    });

    // Remove all listeners for "window-all-closed" event to get tests working
    // on Windows. Without this, the app will close before JSHandle values can
    // be asserted on Windows, causing tests to fail.
    app.removeAllListeners("window-all-closed");

    return handle;
  });

/**
 * Mock successful save file process and close window upon completion.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve to a JSHandle that refers to a count of how many times
 *     the "markdownsave" channel received messages
 */
const mockSaveFileCloseSuccess = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ ipcMain }) => {
    const handle = { markdownSaveCalls: 0 };

    ipcMain.removeAllListeners("markdownsave");
    ipcMain.on("markdownsave", (e, _, exitType?: exitTypes) => {
      handle.markdownSaveCalls += 1;

      if (exitType === "closeWin") {
        ipcMain.emit("windowcloseend", e);
      } else {
        throw new Error(`Encountered unexpected exitType: ${exitType}`);
      }
    });

    return handle;
  });

/**
 * Mock save API and maintain count of how many times it is called. No save API logic is performed.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve to a JSHandle that refers to a count of how many times
 *     the "markdownsave" channel received messages
 */
const mockSaveFileCount = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ ipcMain }) => {
    const handle = { markdownSaveCalls: 0 };

    ipcMain.removeAllListeners("markdownsave");
    ipcMain.on("markdownsave", () => {
      handle.markdownSaveCalls += 1;
    });

    return handle;
  });

/**
 * Mock unsaved changes dialog API and maintain count of how many times it is called. No
 * unsaved changes dialog API logic is performed.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve to a JSHandle that refers to a count of how many times
 *     the "unsavedchangesdialog" channel received messages
 */
const mockUnsavedChangesDialogCount = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ ipcMain }) => {
    const handle = { unsavedChangesDialogCalls: 0 };

    ipcMain.removeAllListeners("unsavedchangesdialog");
    ipcMain.on("unsavedchangesdialog", () => {
      handle.unsavedChangesDialogCalls += 1;
    });

    return handle;
  });

/**
 * Mock unsaved changes dialog to select "Don't Save" option.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve to a JSHandle that refers to a count of how many times
 *     the "unsavedchangesdialog" channel received messages
 */
const mockUnsavedChangesDialogDontSave = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ ipcMain }) => {
    const handle = { unsavedChangesDialogCalls: 0 };

    ipcMain.removeAllListeners("unsavedchangesdialog");
    ipcMain.on("unsavedchangesdialog", (e) => {
      handle.unsavedChangesDialogCalls += 1;

      ipcMain.emit("windowcloseend", e);
    });

    return handle;
  });

/**
 * Mock unsaved changes dialog to select "Save" option.
 * @param electronApp Electron application representation
 * @returns A promise that will resolve to a JSHandle that refers to a count of how many times
 *     the "unsavedchangesdialog" channel received messages
 */
const mockUnsavedChangesDialogSave = (electronApp: ElectronApplication) =>
  electronApp.evaluateHandle(({ BrowserWindow, ipcMain }) => {
    const handle = { unsavedChangesDialogCalls: 0 };

    ipcMain.removeAllListeners("unsavedchangesdialog");
    ipcMain.on("unsavedchangesdialog", (e, exitType: exitTypes) => {
      handle.unsavedChangesDialogCalls += 1;

      const browserWin = BrowserWindow.fromWebContents(e.sender);

      if (!browserWin) {
        throw new Error("BrowserWindow instance could not be found.");
      }

      browserWin.webContents.send("mainmarkdownsave", exitType);
    });

    return handle;
  });

test('app saves a new file and then closes when unsaved changes dialog\'s "Save" option is selected', async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  const unsavedChangesDialogCallsHandle =
    await mockUnsavedChangesDialogSave(electronApp);
  const markdownSaveCallsHandle = await mockSaveFileCloseSuccess(electronApp);
  const isClosedHandle = await isWindowClosed(electronApp);
  const browserWindowHandle = await getBrowserWindow(electronApp);

  // Initialize handle values that need to be tested
  let unsavedChangesDialogCalls =
    await unsavedChangesDialogCallsHandle.evaluate(
      ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
    );
  let markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  let isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to not be called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to not be called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be open
  expect(isClosed).toBe(false);

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Start the close window process to trigger the unsaved dialog
  await browserWindowHandle.evaluate((browserWin) => {
    browserWin.close(); // This should not actually close the window
  });

  // Update handle values that need to be retested
  unsavedChangesDialogCalls = await unsavedChangesDialogCallsHandle.evaluate(
    ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
  );
  markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to be called once
  expect(unsavedChangesDialogCalls).toBe(1);

  // Expect save API to be called once
  expect(markdownSaveCalls).toBe(1);

  // Expect window to be closed
  expect(isClosed).toBe(true);

  await electronApp.close();
});

test('app saves changes to an existing file and then closes when unsaved changes dialog\'s "Save" option is selected', async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  await mockOpenFileSuccess(
    electronApp,
    MOCK_FOOBAR_FILE_PATH,
    MOCK_FOOBAR_FILE_CONTENT,
  );

  const unsavedChangesDialogCallsHandle =
    await mockUnsavedChangesDialogSave(electronApp);
  const markdownSaveCallsHandle = await mockSaveFileCloseSuccess(electronApp);
  const isClosedHandle = await isWindowClosed(electronApp);
  const browserWindowHandle = await getBrowserWindow(electronApp);

  // Initialize handle values that need to be tested
  let unsavedChangesDialogCalls =
    await unsavedChangesDialogCallsHandle.evaluate(
      ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
    );
  let markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  let isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to not be called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to not be called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be open
  expect(isClosed).toBe(false);

  // Click open file button
  await window.getByRole("button", { name: /open file/i }).click();

  // Change markdown in editor from markdown file source
  await window.getByRole("textbox").press("f");

  // Start the close window process to trigger the unsaved dialog
  await browserWindowHandle.evaluate((browserWin) => {
    browserWin.close(); // This should not actually close the window
  });

  // Update handle values that need to be retested
  unsavedChangesDialogCalls = await unsavedChangesDialogCallsHandle.evaluate(
    ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
  );
  markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to be called once
  expect(unsavedChangesDialogCalls).toBe(1);

  // Expect save API to be called once
  expect(markdownSaveCalls).toBe(1);

  // Expect window to be closed
  expect(isClosed).toBe(true);

  await electronApp.close();
});

test("app closes when unsaved changes dialog's \"Don't Save\" option is selected", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  const unsavedChangesDialogCallsHandle =
    await mockUnsavedChangesDialogDontSave(electronApp);
  const markdownSaveCallsHandle = await mockSaveFileCount(electronApp); // Maintain count of save API to check that it is never called
  const isClosedHandle = await isWindowClosed(electronApp);
  const browserWindowHandle = await getBrowserWindow(electronApp);

  // Initialize handle values that need to be tested
  let unsavedChangesDialogCalls =
    await unsavedChangesDialogCallsHandle.evaluate(
      ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
    );
  let markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  let isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to not be called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to not be called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be open
  expect(isClosed).toBe(false);

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Start the close window process to trigger the unsaved dialog
  await browserWindowHandle.evaluate((browserWin) => {
    browserWin.close(); // This should not actually close the window
  });

  // Update handle values that need to be retested
  unsavedChangesDialogCalls = await unsavedChangesDialogCallsHandle.evaluate(
    ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
  );
  markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to be called once
  expect(unsavedChangesDialogCalls).toBe(1);

  // Expect save API to still have never been called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be closed
  expect(isClosed).toBe(true);

  await electronApp.close();
});

test('app remains open when unsaved changes dialog\'s "Cancel" option is selected', async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  const unsavedChangesDialogCallsHandle =
    await mockUnsavedChangesDialogCount(electronApp); // Maintains count of unsaved changes dialog API and mocks "Cancel" option behavior
  const markdownSaveCallsHandle = await mockSaveFileCount(electronApp); // Maintain count of save API to check that it is never called
  const isClosedHandle = await isWindowClosed(electronApp);
  const browserWindowHandle = await getBrowserWindow(electronApp);

  // Initialize handle values that need to be tested
  let unsavedChangesDialogCalls =
    await unsavedChangesDialogCallsHandle.evaluate(
      ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
    );
  let markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  let isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to not be called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to not be called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be open
  expect(isClosed).toBe(false);

  // Type markdown in the editor
  await window.getByRole("textbox").fill(MOCK_FOOBAR_FILE_CONTENT);

  // Start the close window process to trigger the unsaved dialog
  await browserWindowHandle.evaluate((browserWin) => {
    browserWin.close(); // This should not actually close the window
  });

  // Update handle values that need to be retested
  unsavedChangesDialogCalls = await unsavedChangesDialogCallsHandle.evaluate(
    ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
  );
  markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to be called once
  expect(unsavedChangesDialogCalls).toBe(1);

  // Expect save API to still have never been called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to remain open
  expect(isClosed).toBe(false);

  await skipUnsavedChangesDialog(electronApp);
  await electronApp.close();
});

test("unsaved changes dialog does not appear when changes are not present in the editor", async () => {
  const electronApp = await launchElectron();
  const window = await electronApp.firstWindow();

  const unsavedChangesDialogCallsHandle =
    await mockUnsavedChangesDialogCount(electronApp); // Maintains count of unsaved changes dialog API and mocks "Cancel" option behavior
  const markdownSaveCallsHandle = await mockSaveFileCount(electronApp); // Maintain count of save API to check that it is never called
  const isClosedHandle = await isWindowClosed(electronApp);
  const browserWindowHandle = await getBrowserWindow(electronApp);

  // Initialize handle values that need to be tested
  let unsavedChangesDialogCalls =
    await unsavedChangesDialogCallsHandle.evaluate(
      ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
    );
  let markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  let isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect editor to be visible once frontend has loaded
  await expect(window.getByRole("textbox")).toBeVisible();

  // Expect unsaved changes dialog API to not be called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to not be called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be open
  expect(isClosed).toBe(false);

  // Start the close window process to trigger the unsaved dialog
  await browserWindowHandle.evaluate((browserWin) => {
    browserWin.close(); // This should not actually close the window
  });

  // Update handle values that need to be retested
  unsavedChangesDialogCalls = await unsavedChangesDialogCallsHandle.evaluate(
    ({ unsavedChangesDialogCalls }) => unsavedChangesDialogCalls,
  );
  markdownSaveCalls = await markdownSaveCallsHandle.evaluate(
    ({ markdownSaveCalls }) => markdownSaveCalls,
  );
  isClosed = await isClosedHandle.evaluate(({ isClosed }) => isClosed);

  // Expect unsaved changes dialog API to still have never been called
  expect(unsavedChangesDialogCalls).toBe(0);

  // Expect save API to still have never been called
  expect(markdownSaveCalls).toBe(0);

  // Expect window to be closed after the save occurred
  expect(isClosed).toBe(true);

  await electronApp.close();
});
