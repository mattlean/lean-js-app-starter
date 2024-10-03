# Styling

LJAS supports [CSS](https://w3.org/Style/CSS/Overview.en.html) for all frontend-related projects:

| Starter Project Name                  | JavaScript                                               | TypeScript                                                  |
| ------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Basic Browser                         | [View Source](../../starters/basic-browser)              | [View Source](../../starters/basic-browser-ts)              |
| Basic Electron                        | [View Source](../../starters/basic-electron)             | [View Source](../../starters/basic-electron-ts)             |
| React + Browser                       | [View Source](../../starters/react-electron)             | [View Source](../../starters/react-electron-ts)             |
| React + Electron                      | [View Source](../../starters/react-electron)             | [View Source](../../starters/react-electron-ts)             |
| React + Express + MongoDB with SSR    | [View Source](../../starters/react-express-mongo-ssr)    | [View Source](../../starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](../../starters/react-express-postgres-ssr) | [View Source](../../starters/react-express-postgres-ssr-ts) |

## Contents

-   [Getting Started](#getting-started)
-   [Linting](#linting)
-   [Formatting](#formatting)
-   [Adding Support for Sass](#adding-support-for-sass)

## Getting Started

You can create a `.css` file anywhere and import it in JavaScript file. So for example you could create `src/index.css` and then import it in `src/index.js` like so:

```javascript
import './index.css'
```

Then webpack will handle generating the CSS files for the build process.

You can see an example of this in the [`buildCss` `ljas-webpack` example](../../ljas-webpack/examples/buildCss).

## Linting

LJAS uses [Stylelint](https://stylelint.io) to lint all CSS-related code. You can run it with the following `package.json` script:

```console
npm run lint:styles
```

Stylelint has a [`--fix` option](https://stylelint.io/user-guide/options/#fix) which will cause it to automatically fix as many problems as possible. A shortcut for passing this option is available as the following script:

```console
npm run lint:styles:fix
```

Instead of using `package.json` scripts, we suggest enabling Stylelint in your code editor to lint in real-time. We show how to set this up with [Visual Studio Code (VS Code)](https://code.visualstudio.com) in the ["Install Extensions" section in the Code Editors document](../setup/code-editors.md#install-extensions).

To learn how to configure Stylelint, read the [Stylelint configuration document](../configuration/stylelint.md).

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

## Adding Support for Sass

To learn how to add support for Sass in your project, refer to the ["Adding Support for Sass" section in the Stylelint configuration document](../configuration/stylelint.md#adding-support-for-sass).
