# JavaScript & TypeScript

## Contents

-   [ECMAScript Version](#ecmascript-version)
-   [TypeScript Version](#typescript-version)
-   [Creating JavaScript, TypeScript, and JSX-Related Files](#creating-javascript-typescript-and-jsx-related-files)
-   [Linting](#linting)
-   [Type Checking](#type-checking)
-   [Formatting](#formatting)
-   [Auto & Hot Reloading](#auto--hot-reloading)
-   [Configuration](#configuration)

## ECMAScript Version

LJAS allows you to use most of the latest ECMAScript features thanks to [Babel](https://babeljs.io/docs). You can view what features are available in [Babel's docs for `@babel/preset-env`](https://babeljs.io/docs/babel-preset-env).

## TypeScript Version

LJAS currently uses version ~5.3.3. Most of the time we are slightly behind the latest version because we only upgrade to the newest version that [`@typescript-eslint`](https://typescript-eslint.io) supports.

## Creating JavaScript, TypeScript, and JSX-Related Files

All of the application's ECMAScript-related files must exist in the `src/` directory.

If you are using a JavaScript-only starter, these files will commonly have a `.js` file extension.

If you are using a TypeScript starter, you will usually be using files with a `.ts` file extension instead, but JavaScript code under `.js` files is still allowed although it is not recommended.

If your ECMAScript code uses [JSX](https://react.dev/learn/writing-markup-with-jsx), then you will need to add an "x" to the end of the file extension. So for JavaScript that would be `.jsx` and for TypeScript that would be `.tsx`.

We understand it may not be common to require `.jsx` file extensions for code involving JSX, but we thought it made sense to be consistent with [TypeScript's rule that restricts JSX to files with `.tsx` file extensions](https://typescriptlang.org/docs/handbook/jsx.html). If you want to alter that behavior you can go into the ESLint config file, `.eslintrc.js`, and change the [`react/jsx-filename-extension` rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md).

## Linting

LJAS uses [ESLint](https://eslint.org) to lint JavaScript and TypeScript. You can run it with the following `package.json` script:

```console
npm run lint
```

ESLint has a [`--fix` option](https://eslint.org/docs/latest/use/command-line-interface#--fix) which will cause it to automatically fix as many problems as possible. A shortcut for passing this option is available as the following script:

```console
npm run lint:fix
```

Instead of using `package.json` scripts, we suggest enabling ESLint in your code editor to lint in real-time. We show how to set this up with [Visual Studio Code (VS Code)](https://code.visualstudio.com) in the ["Install Extensions" section in the Code Editors document](../setup/code-editors.md#install-extensions).

To learn how to configure ESLint, read the [ESLint configuration document](../configuration/eslint.md).

## Type Checking

You can run the TypeScript compiler to type check the project source code by running the following `package.json` script:

```console
npm run check-types
```

Instead of using this script, we suggest enabling real-time type checking in your code editor. We suggest using VS Code since it does this for you out-of-the-box.

## Formatting

LJAS uses [Prettier](https://prettier.io) to format all code. To identify all files with code style issues, run the following `package.json` script:

```console
npm run format
```

Note that this is an alias for `npm run format:check` which only identifies issues and does not make any changes to files.

If you want to automatically address all of these code style issues, use the following script:

```console
npm run format:fix
```

Instead of using these scripts, we suggest enabling formatting on save with Prettier in your code editor. We show how to set this up with VS Code in the ["Install Extensions" section in the Code Editors document](../setup/code-editors.md#install-extensions).

To learn how to configure Prettier, read the [Prettier configuration document](../configuration/prettier.md).

## Auto & Hot Reloading

We utilize [webpack](https://webpack.js.org)'s [watch mode](https://webpack.js.org/configuration/watch) for [Node.js](https://nodejs.org)-based source code and [webpack-dev-server](https://webpack.js.org/configuration/dev-server) for browser-based source code to watch the `src/` directory and create new builds if any changes occur there. This is done during `package.json` scripts like `build:watch` and `dev` (e.g., `npm run backend:build:watch`, `npm run frontend:dev`, `npm run main:build:watch`, `npm run renderer:dev`).

Note that webpack alone only generates a new build and will not restart the app process. This means that, for most build processes except for those involving hot reloading, changes may not be reflected in a running app until you shut down its current one and start a completely new app process. That responsibility is given to [Nodemon](https://nodemon.io) which restarts the app after webpack completes generating a new build, enabling auto reload functionality.

So one (not recommended) way to get auto reloading working is to run a command similar to the following:

```
npm run build:watch && npm run start:debug
```

In this case, `npm run build:watch` runs webpack which will create new builds when changes occur to the source code. Then `npm run start:debug` runs Nodemon which will run the app process and then restart it after webpack finishes a new build.

The recommend method is the `dev` `package.json` script that essentially does all of this for you except in [a better way with concurrently](https://github.com/open-cli-tools/concurrently):

```
npm run dev
```

Frontend React-related build processes do not rely on auto reloading and Nodemon in the same way because [React Fast Refresh](https://reactnative.dev/docs/fast-refresh) is used to show your app's changes instead. This feature is setup with [React Refresh Webpack Plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) and activates hot reloading which enables webpack-dev-server to seamlessly update specific modules and components while the app is running, only falling back to a full reload when absolutely necessary.

This allows React development to iterate faster because changes will be "live patched" to the app process which will run continuously and uninterrupted. This is in contrast to auto reloading where Nodemon has to completely restart the app process every time a change occurs.

## Configuration

Read the following configuration documents to learn how the corresponding configurations work and how to customize them yourself:

-   [Babel](../configuration/babel.md)
-   [ESLint](../configuration/eslint.md)
-   [nodemon](../configuration/nodemon.md)
-   [Prettier](../configuration/prettier.md)
-   [TypeScript](../configuration/typescript.md)
-   [webpack](../configuration/webpack.md)
