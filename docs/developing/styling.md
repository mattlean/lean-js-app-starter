# Styling

LJAS supports [CSS](https://w3.org/Style/CSS/Overview.en.html) for all frontend-related projects:

| Starter Project Name                  | JavaScript                                                                                                         | TypeScript                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Basic Browser                         | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/basic-browser)              | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/basic-browser-ts)              |
| Basic Electron                        | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/basic-electron)             | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/basic-electron-ts)             |
| React + Browser                       | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-browser)              | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-browser-ts)              |
| React + Electron                      | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-electron)             | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-electron-ts)             |
| React + Express + MongoDB with SSR    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-mongo-ssr)    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-postgres-ssr) | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-postgres-ssr-ts) |

## Contents

- [Getting Started](#getting-started)
- [Linting](#linting)
- [Formatting](#formatting)
- [Examples](#examples)
- [Adding Support for Sass](#adding-support-for-sass)

## Getting Started

You can create a `.css` anywhere in the `src/` directory and import it in any ECMAScript file. So for example you could create `src/index.css` and then import it in `src/index.js` like so:

```javascript
import "./index.css";
```

Then webpack will handle how the CSS gets loaded in the bundle during the build process.

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

Instead of using `package.json` scripts, we suggest enabling Stylelint in your code editor to lint in real-time. We show how to set this up with [Visual Studio Code (VS Code)](https://code.visualstudio.com) in the ["Install Extensions" section in the "Code Editors" document](../setup/code-editors.md#install-extensions).

To learn how to configure Stylelint, read the [Stylelint configuration document](../configuration/stylelint.md).

## Formatting

LJAS uses [Prettier](https://prettier.io) to format all code. To identify all files with code style issues, run the following `package.json` script:

```console
npm run format
```

Note that this is an alias for `npm run format:check` which only identifies issues and does not make any changes to files.

If you want to automatically address all of these code style issues, use the following script:

```console
npm run format:write
```

Instead of using these scripts, we suggest enabling formatting on save with Prettier in your code editor. We show how to set this up with VS Code in the ["Install Extensions" section in the "Code Editors" document](../setup/code-editors.md#install-extensions).

To learn how to configure Prettier, read the [Prettier configuration document](../configuration/prettier.md).

## Examples

- [\*chan](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/examples/starchan): Express server that server-side renders a React frontend
- [Asset Test](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/examples/asset-test): Test for LJAS's asset loading capabilities
- [Markdown Editor](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/examples/markdown-editor): Markdown editor desktop app
- [Tic-Tac-Toe](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/examples/tic-tac-toe): A tic-tac-toe game

## Adding Support for Sass

The frontend starter projects only support CSS by default since that is the fundamental stylesheet language, but it doesn't take much to setup [Sass](https://sass-lang.com).

Install [Dart Sass](https://github.com/sass/dart-sass) and [sass-loader](https://webpack.js.org/loaders/sass-loader) with the following command:

```console
npm install sass@~1.64.2 sass-loader@^13.3.2
```

Next, you will need to replace the CSS-related [`ljas-webpack`](../../ljas-webpack) config parts in the frontend webpack configuration with the equivalent Sass config parts.

So, for example, in a frontend webpack development config file, you'd replace `injectCss` with `injectSass`. Then in a frontend webpack production config file, you'd replace `buildPrefixedCss` with `buildPrefixedSass`.

Finally, the last thing to do is configure Stylelint to cover `.scss` files. Install the standard Stylelint SCSS config with the following command:

```console
npm install stylelint-config-standard-scss@^11.0.0 --save-dev
```

Then update `.stylelintrc.json` to include `stylelint-config-standard-scss` in the `extends` property like so:

```json
{ "extends": ["stylelint-config-standard-scss"] }
```

You should be able to handle `.sass` and `.scss` files in your JavaScript or TypeScript code now.

Although everything should be working, you should also update the `lint:styles` `package.json` script to look for `.sass` and `.scss` files using something like this command:

```
"lint:styles": "stylelint \"src/**/*.{sass,scss}\"",
```

You can find examples of Sass being configured in the [Counter](../../examples/counter) and [Counter, React version](../../examples/counter-react) examples.
