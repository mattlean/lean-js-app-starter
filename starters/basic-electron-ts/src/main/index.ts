import "dotenv/config";
import { BrowserWindow, app } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import path from "path";

const BUNDLED_PRELOAD_BUILD_PATH = path.join(__dirname, "../preload");
const BUNDLED_RENDERER_BUILD_PATH = path.join(__dirname, "../renderer");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: `${BUNDLED_PRELOAD_BUILD_PATH}/preload.js`,
    },
  });

  win.loadFile(`${BUNDLED_RENDERER_BUILD_PATH}/index.html`);

  win.once("ready-to-show", () => {
    win.show();
    win.focus();
  });
};

app.whenReady().then(() => {
  if (process.env.NODE_ENV === "development") {
    installExtension(REACT_DEVELOPER_TOOLS, {
      loadExtensionOptions: { allowFileAccess: true },
    })
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err));
  }

  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
