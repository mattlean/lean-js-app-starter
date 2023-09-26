# Debugging

## Debugging Node.js projects with Visual Studio Code

TODO:

## Debugging frontend projects with Google Chrome

TODO:

## Debugging webpack build process with Google Chrome

First start [webpack](https://webpack.js.org) in debug mode using either `npm run build:debug` to debug the development build process or `npm run build:production:debug` to debug the production build process.

You should see something like this appear in your terminal:

```
Debugger listening on ws://127.0.0.1:9229/768d264d-846e-4d3a-ba17-ee63f47a6996
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
```

Next open up Google Chrome and navigate to [chrome://inspect](chrome://inspect). Under "Remote Target" you should see a debug process running for webpack. Click on "inspect" and a new Chrome DevTools window should open up.

Because the [`--inspect-brk`](https://nodejs.org/api/debugger.html#v8-inspector-integration-for-nodejs) flag was used, you should see that DevTools will have paused webpack on the first line of code it executed.
