# Debugging

## Node.js applications & Electron main processes with Visual Studio Code

In Visual Studio Code, open the "Run and Debug" sidebar. Then use one of the following options in its configuration dropdown:

### 1. Attach to Running App or Attach to Running Main Process

Select this option if you already have the Node.js app or main process running in debug mode and hit the green play button to start debugging.

You can run debug mode using the `start:debug` `package.json` script. You can alternatively use `dev` `package.json` script as well since under-the-hood it just reuses the `start:debug` script.

Note that for Node.js apps, the Docker dev environment already runs the app in debug mode by default. Therefore once the container is running you can skip straight to using this option in the dropdown.

### 2. Launch & Attach to App or Launch & Attach to Main Process

Select this option if the Node.js app or main process is not currently running and hit the green play button to start debugging. This will start the app in debug mode.

Note that this does require a build to already exist, so if one isn't already available you will need to run the build process first before using this option.

## Frontend applications with Google Chrome

Simply open up the app in Google Chrome and open up Chrome DevTools.

## Jest tests with Visual Studio Code

In Visual Studio Code, open the "Run and Debug" sidebar. Then select one of the following options in its configuration dropdown:

### 1. Attach to Running Jest

Use this option if you already have Jest tests running in debug mode. You can start Jest in debug mode using the `test:debug` `package.json` script.

The `test:debug` `package.json` script uses the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag, so you should see that debugger will have paused on Jest's first line of execution. From here you can set breakpoints and then use the "Continue (F5)" option to try and encounter your first breakpoint.

### 2. Launch & Attach to Jest

Use this option if Jest is not currently running. It will start Jest in debug mode.

Finally, hit the green play button to start debugging.

## Playwright tests

TODO:

## webpack build process with Google Chrome

First start [webpack](https://webpack.js.org) in debug mode using a debugging build script `package.json` script like `npm run build:debug`. [Note that if you're using the Docker dev environment, you must run these commands from within the container for them to work](./developing-with-docker.md#how-can-i-run-terminal-commands-inside-the-container).

You should see something like this appear in your terminal:

```
Debugger listening on ws://0.0.0.0:9231/3da93a0a-8478-4d30-89ff-48ea8474604c
For help, see: https://nodejs.org/en/docs/inspector
```

Next open up Google Chrome and navigate to [chrome://inspect](chrome://inspect).

First, we need to make sure that Chrome can find the debugging process. Make sure that "Discover network targets" is checked and then click on the "Configure..." button next to it. In the "Target discovery settings" modal that pops up, add `localhost:9231` and click "Done".

Now Chrome should have found the webpack debug process under "Remote Target". Click on "inspect" and a new Chrome DevTools window should open up where you'll be able to debug the build process.

The debugging build `package.json` scripts use the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag, so you should see that DevTools will have paused on webpack's first line of execution. From here you can set breakpoints and then use the "Continue (F5)" option to try and encounter your first breakpoint.
