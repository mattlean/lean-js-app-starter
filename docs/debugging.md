# Debugging

## Node.js applications with Visual Studio Code

In Visual Studio Code, open the "Run and Debug" sidebar. Then select one of the following options in its configuration dropdown:

1. **Attach to Running App**: Use this option if you already have the Node.js app running in debug mode. You can start the Node.js app in debug mode using the `start:debug` package.json script. The Docker dev environment already uses this package.json script by default.
2. **Start New App**: Use this option if the Node.js app is not currently running. It will start the app in debug mode. Note that this does require a build of the Node.js app to already exist, so if it doesn't then you will need to run the build process first before using this option.

Finally, hit the green play button to start debugging.

## Frontend applications with Google Chrome

Simply open up the app in Google Chrome and open up Chrome DevTools.

## Jest tests

TODO:

## Playwright tests

TODO:

## webpack build process with Google Chrome

First start [webpack](https://webpack.js.org) in debug mode using a build script package.json script like `npm run build:debug`. [Note that if you're using the Docker dev environment, you must run these commands from within the container for them to work](./developing-with-docker.md#how-can-i-run-terminal-commands-inside-the-container).

You should see something like this appear in your terminal:

```
Debugger listening on ws://0.0.0.0:9231/3da93a0a-8478-4d30-89ff-48ea8474604c
For help, see: https://nodejs.org/en/docs/inspector
```

Next open up Google Chrome and navigate to [chrome://inspect](chrome://inspect).

First, we need to make sure that Chrome can find the debugging process. Make sure that "Discover network targets" is checked and then click on the "Configure..." button next to it. In the "Target discovery settings" modal that pops up, add `localhost:9230` and click "Done".

Now Chrome should have found the webpack debug process under "Remote Target". Click on "inspect" and a new Chrome DevTools window should open up where you'll be able to debug the build process.

Because the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag was used, you should see that DevTools will have paused webpack on the first line of code it executed.
