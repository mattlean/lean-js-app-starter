/**
 * Main-sent events (MSE) send messages that originate from the main process and
 * are transmitted to the renderer process.
 *
 * This is the opposite of the API where the system goes in reverse and messages
 * originate from the renderer process and are transmitted to the main process.
 */
import { BrowserWindow } from "electron";

import { colorModes, exitTypes } from "../../common/types";

/**
 * Tell the renderer process to start the window closing process.
 * @param win BrowserWindow instance
 */
export const closeWindowStart = (win?: BrowserWindow) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("windowclosestart");
};

/**
 * Tell the renderer process to start the app quitting process.
 * @param win BrowserWindow instance
 */
export const quitAppStart = (win?: BrowserWindow) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("appquitstart");
};

/**
 * Tell the renderer process to send an API request to initiate the save process.
 * @param win BrowserWindow instance
 * @param exitType Determines what type of exit process to take if defined
 */
export const saveFileMain = (win?: BrowserWindow, exitType?: exitTypes) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("mainmarkdownsave", exitType);
};

/**
 * Send an error message to the renderer process.
 * @param err Error message string or Error instance to display in the renderer process
 * @param win BrowserWindow instance
 */
export const sendMainErrorMessage = (
  err: Error | string,
  win?: BrowserWindow,
) => {
  const error = typeof err === "string" ? new Error(err) : err;

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("mainerrormessage", error.message);
};

/**
 * Tell the renderer process to send an API request to initiate the file open process.
 * @param win BrowserWindow instance
 */
export const showFileOpenDialogMain = (win?: BrowserWindow) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("mainmarkdownopendialog");
};

/**
 * Tell the renderer process to send an API request to initiate the HTML export process.
 * @param win BrowserWindow instance
 */
export const showHtmlExportDialogMain = (win?: BrowserWindow) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("mainhtmlexportdialog");
};

/**
 * Tell the renderer process to sync the color button with the color mode menu items.
 * @param colorMode Color mode type that determines which color mode to use
 * @param win BrowserWindow instance
 */
export const syncColorModeBtn = (
  colorMode: colorModes,
  win?: BrowserWindow,
) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("colormodemenu", colorMode);
};

/**
 * Tell the renderer process to toggle the focus mode.
 * @param win BrowserWindow instance
 */
export const toggleFocusMode = (win?: BrowserWindow) => {
  const w = win ?? BrowserWindow.getFocusedWindow();

  if (!w) {
    return;
  }

  w.webContents.send("focusmodetoggle");
};
