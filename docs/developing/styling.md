# Styling

LJAS supports [CSS](https://w3.org/Style/CSS/Overview.en.html) for all frontend-related projects:

| Starter Project Name                  | JavaScript                                               | TypeScript                                                  |
| ------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| Basic Browser                         | [View Source](../../starters/basic-browser)              | [View Source](../../starters/basic-browser-ts)              |
| Basic Electron                        | [View Source](../../starters/basic-electron)             | [View Source](../../starters/basic-electron-ts)             |
| React Browser                         | [View Source](../../starters/react-electron)             | [View Source](../../starters/react-electron-ts)             |
| React Electron                        | [View Source](../../starters/react-electron)             | [View Source](../../starters/react-electron-ts)             |
| React + Express + MongoDB with SSR    | [View Source](../../starters/react-express-mongo-ssr)    | [View Source](../../starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](../../starters/react-express-postgres-ssr) | [View Source](../../starters/react-express-postgres-ssr-ts) |

## Contents

-   [Getting Started](#getting-started)
-   [Adding Support for Sass](#adding-support-for-sass)

## Getting Started

You can create a `.css` file anywhere and import it in JavaScript file. So for example you could create `src/index.css` and then import it in `src/index.js` like so:

```javascript
import './index.css'
```

Then webpack will handle generating the CSS files for the build process.

You can see an example of this in the [`buildCss` `ljas-webpack` example](../../ljas-webpack/examples/buildCss).

## Adding Support for Sass

The frontend starter projects only support CSS by default since that is the fundamental stylesheet language, but it doesn't take much to setup Sass.

Install [Sass](https://github.com/sass/dart-sass) and [sass-loader](https://webpack.js.org/loaders/sass-loader) with the following command:

```console
npm install sass@~1.64.2 sass-loader@^13.3.2
```

Next you will need to replace the CSS-related [`ljas-webpack`](https://npmjs.com/package/ljas-webpack) webpack config parts in the frontend webpack configuration with the equivalent Sass parts.

So, for example, in a frontend webpack development config file, you'd replace `injectCss` with `injectSass`. Then in a frontend webpack production config file, you'd replace `buildPrefixedCss` with `buildPrefixedSass`.

Finally, the last thing to do is configure [Stylelint](https://stylelint.io) to cover `.scss` files. Install the standard Stylelint SCSS config with the following command:

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
