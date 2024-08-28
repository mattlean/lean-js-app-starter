# Debugging

## Contents

-   [Node.js applications & Electron main processes with Visual Studio Code](#nodejs-applications--electron-main-processes-with-visual-studio-code)
-   [Frontend applications with Google Chrome](#frontend-applications-with-google-chrome)
-   [Jest tests with Visual Studio Code](#jest-tests-with-visual-studio-code)
-   [Playwright Tests with Visual Studio Code](#playwright-tests-with-visual-studio-code)
-   [Playwright Tests with Playwright Inspector](#playwright-tests-with-playwright-inspector)
-   [webpack build process with Google Chrome](#webpack-build-process-with-google-chrome)

---

## Node.js applications & Electron main processes with Visual Studio Code

In VS Code, open the run and debug view by clicking on its icon in the activity bar on the side of the editor. The icon looks like this:  
![VS Code run and debug view icon](../images/vs-code-run-and-debug-icon.png)

Then select one of the following options in its configuration dropdown:

### 1. Attach to Running App or Attach to Running Main Process

Select this option if you already have the Node.js app or main process running in debug mode and hit the green play button to start debugging.

You can run the app or process in debug mode using the `start:debug` `package.json` script. You can alternatively use `dev` `package.json` script as well since under-the-hood it just reuses the `start:debug` script.

Note that for Node.js apps, the Docker dev environment already runs the app in debug mode by default. Therefore you can skip straight to using this option in the dropdown after the container's app is running.

### 2. Launch & Attach to App or Launch & Attach to Main Process

Select this option if the Node.js app or main process is not currently running and hit the green play button to start debugging. This will start the app or process in debug mode.

Note that this does require a build to already exist, so if one isn't already available you will need to run the build process first before using this option.

[Learn more about debugging with VS Code through its "Debugging" user guide.](https://code.visualstudio.com/docs/editor/debugging)

## Frontend applications with Google Chrome

Simply open up the app in Google Chrome and open up Chrome DevTools.

[Learn more about debugging with Chrome DevTools through its "Debug JavaScript" tutorial.](https://developer.chrome.com/docs/devtools/javascript)

## Jest tests with Visual Studio Code

In VS Code, open the run and debug view by clicking on its icon in the activity bar on the side of the editor. The icon looks like this:  
![VS Code run and debug view icon](../images/vs-code-run-and-debug-icon.png)

Then select one of the following options in its configuration dropdown:

### 1. Attach to Running Jest

Select this option if you already have Jest tests running in debug mode and hit the green play button to start debugging.

You can run Jest in debug mode using the `test:debug` `package.json` script. The `test:debug` `package.json` script uses the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag, so you should see that debugger will have paused on Jest's first line of execution. From here you can set breakpoints and then use the "Continue (F5)" option to try and encounter your first breakpoint.

### 2. Launch & Attach to Jest

Select this option if Jest is not currently running and hit the green play button to start debugging. This will start Jest in debug mode.

[Learn more about debugging with VS Code through its "Debugging" user guide.](https://code.visualstudio.com/docs/editor/debugging)

## Playwright Tests with Visual Studio Code

Using VS Code with the [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) to debug tests is the recommended method for debugging Playwright. The Playwright docs have [a great guide on how to use it](https://playwright.dev/docs/getting-started-vscode) that includes [a section specifically on debugging](https://playwright.dev/docs/getting-started-vscode#debugging-tests).

Note that this method does not work with Electron. For that we recommend the [Playwright Inspector](#playwright-tests-with-playwright-inspector).

## Playwright Tests with Playwright Inspector

The Playwright Inspector is a GUI tool that's an alternate method for debugging tests. We recommend debugging Playwright with [VS Code's Playwright extension](#playwright-tests-with-visual-studio-code) over this method, but this is the go-to option if you are not coding with VS Code. Also Electron Playwright tests will not work with the VS Code extension, so this is actually the best option for debugging in that scenario.

The Playwright docs have [a great guide on how to debug with the Playwright Inspector](https://playwright.dev/docs/debug#playwright-inspector).

## webpack build process with Google Chrome

First start webpack in debug mode using a debugging `package.json` build script like `npm run build:debug` or `npm run build:production:debug`.

Note that if you're using the Docker dev environment, you must run these commands from within the container for them to work.

You should see something like this appear in your terminal:

```
Debugger listening on ws://0.0.0.0:9231/3da93a0a-8478-4d30-89ff-48ea8474604c
For help, see: https://nodejs.org/en/docs/inspector
```

Next open up Google Chrome and navigate to [`chrome://inspect`](chrome://inspect).

First, we need to make sure that Chrome can find the debugging process. Make sure that "Discover network targets" is checked and then click on the "Configure..." button next to it. In the "Target discovery settings" modal that pops up, add the host and port (in this case it is `localhost:9231`, but may differ for your scenario) and click "Done".

Now Chrome should have found the webpack debug process under "Remote Target". Click on "inspect" and a new Chrome DevTools window should open up where you'll be able to debug the build process.

The debugging build `package.json` scripts use the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag, so you should see that DevTools will have paused on webpack's first line of execution. From here you can set breakpoints and then use the "Continue (F5)" option to try and encounter your first breakpoint.

[Learn more about debugging with Chrome DevTools through its "Debug JavaScript" tutorial.](https://developer.chrome.com/docs/devtools/javascript)
