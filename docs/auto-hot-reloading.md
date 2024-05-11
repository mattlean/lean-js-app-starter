# Auto & Hot Reloading

Lean JS App Starter uses two different processes that respond to changes made to your codebase and show your app's changes as quickly as possible in the development environment:

## 1. webpack watch mode

[webpack watch mode](https://webpack.js.org/configuration/watch) watches the app's source code (i.e. all the code in the `src/` directory) and restarts the build process if any code changes are encountered. It is used for some `build:watch` and `dev` `package.json` scripts depending on if the script is related to a Node.js or browser context (e.g., `npm run backend:build:watch`, `npm run frontend:dev`, `npm run main:build:watch`, `npm run renderer:dev`).

Note that webpack watch mode alone only generates a new build and will not restart the app process. This means that, for most processes except for those that involve hot reloading, changes may not be reflected in a running app until you shut down the current one and start a completely new process. That responsibility is given to nodemon which restarts the app after webpack finishes generating a new build.

So one (not recommended) way to get auto reloading working (i.e. automatically generating a new build and restarting the app when changes occur) is to run a command similar to the following:

```
npm run build:watch && npm run start:debug
```

In this case, `npm run build:watch` runs webpack watch mode to generate a new build, and `npm run start:debug` runs nodemon which will run the app process and completely restart it when a new build is generated.

The recommend method is the `dev` `package.json` script that essentially does all of this for you except in [a better way with concurrently](https://github.com/open-cli-tools/concurrently):

```
npm run dev
```

Frontend React-related build processes do not rely on auto reloading and nodemon in the same way because [React Fast Refresh](https://reactnative.dev/docs/fast-refresh) is used to show your app's changes instead. This feature activates hot reloading which enables webpack to seamlessly update specific modules and components while the app is running, only falling back to a full reload when absolutely necessary.

This allows React development to iterate faster because changes will be "live patched" to the app process which will run continuously and uninterrupted. This is in contrast to auto reloading where nodemon has to completely restart the app process every time a change occurs.

## 2. nodemon

Each project may have a different set of [nodemon](https://github.com/remy/nodemon) configuration files, but they all fall into one of the following two categories:

### a) Configuration File Watch

These nodemon config files are responsible for restarting the webpack build processes when changes to configuration files occur. They are used for some `build:watch` and `dev` `package.json` scripts depending on if the script is related to a Node.js or browser context (e.g., `npm run backend:build:watch`, `npm run frontend:dev`, `npm run main:build:watch`, `npm run renderer:dev`):

-   `nodemon.json`
-   `nodemon.backend.json`
-   `nodemon.frontend.json`
-   `nodemon.main.json`
-   `nodemon.preload.json`
-   `nodemon.renderer.json`

This type of nodemon config file works in tandem with webpack watch mode, so nodemon isn't actually responsible for watching for changes in the app's source code (i.e. all the code in the `src/` directory). That's webpack watch mode's job.

Instead, nodemon watches files outside of webpack watch mode's jurisdiction like `package.json`, nodemon config files, and webpack config files (i.e. anything outside of the `src/` directory) that should still affect the build in some way.

### b) Application Auto Reload

These nodemon config files are responsible for restarting the app process when new builds are found (i.e. changes to the `build/` directory) which essentially enables auto reloading. They are used for the `start:debug` and `dev:production` `package.json` scripts:

-   `nodemon.development.json`
-   `nodemon.production.json`

Note that `nodemon.production.json` is not actually used for production deployments. It is only used for debugging production builds with the development environment.
