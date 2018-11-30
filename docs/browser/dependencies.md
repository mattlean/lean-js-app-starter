# Web Browser: Dependencies
To check versions for each dependecy, please view [`package.json`](../../package.json).

## Production
* [**`cross-fetch`**](https://npmjs.com/package/cross-fetch)  
Universal fetch API for browsers and Node.js. Chosen over other solutions so fetch API dependency can be consistent across all environments.
* [**`prop-types`**](https://npmjs.com/package/prop-types)  
Type checking for `react` props. Recommended for use when `flow-bin` isn't being used.
* [**`react`**](https://npmjs.com/package/react)  
User interface library
* [**`react-dom`**](https://npmjs.com/package/react-dom)  
Entry point to the DOM for `react`
* [**`react-hot-loader`**](https://npmjs.com/package/react-hot-loader)  
Update `react` components without refreshing the browser while maintaining state
* [**`react-redux`**](https://npmjs.com/package/react-redux)  
`react` bindings for `redux`
* [**`react-router-dom`**](https://npmjs.com/package/react-router-dom)  
Routing library for `react`
* [**`redux`**](https://npmjs.com/package/redux)  
State management library
* [**`redux-logger`**](https://npmjs.com/package/redux-logger)  
`redux` logging middleware. Only used in development builds.

## Development
* [**`@babel/core`**](https://npmjs.com/package/@babel/core)  
JavaScript compiler
* [**`@babel/plugin-proposal-class-properties`**](https://npmjs.com/package/@babel/plugin-proposal-class-properties)  
[`@babel/core` plugin that transforms static class properties as well as properties declared with the property initializer syntax](https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html)
* [**`@babel/plugin-transform-modules-commonjs`**](https://npmjs.com/package/@babel/plugin-transform-modules-commonjs)  
[`@babel/core` plugin that transforms ES2015 modules to CommonJS](https://babeljs.io/docs/en/next/babel-plugin-transform-modules-commonjs.html)
* [**`@babel/plugin-transform-react-jsx-source`**](https://npmjs.com/package/@babel/plugin-transform-react-jsx-source)  
[`@babel/core` plugin that adds a __source prop to all JSX elements and enables filenames and line numbers in component stack traces](https://babeljs.io/docs/en/next/babel-plugin-transform-react-jsx-source.html)
* [**`@babel/preset-env`**](https://npmjs.com/package/@babel/preset-env)  
[`@babel/core` smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)](https://babeljs.io/docs/en/next/babel-preset-env.html)
* [**`@babel/preset-flow`**](https://npmjs.com/package/@babel/preset-flow)  
[`@babel/core` preset for all `flow-bin` plugins](https://babeljs.io/docs/en/next/babel-preset-flow.html)
* [**`@babel/preset-react`**](https://npmjs.com/package/@babel/preset-react)  
[`@babel/core` preset for all `react` plugins](https://babeljs.io/docs/en/next/babel-preset-react.html)
* [**`autoprefixer`**](https://npmjs.com/package/autoprefixer)  
`postcss` plugin that adds vendor prefixes to styles based on what you need for your target environments
* [**`babel-core@^7.0.0-bridge`**](https://npmjs.com/package/babel-core)  
Duplicate of `@babel/core`, but is needed for some older Babel related dependencies.
* [**`babel-eslint`**](https://npmjs.com/package/babel-eslint)  
Parser for `eslint` that enables linting of `@babel/core` code
* [**`babel-jest`**](https://npmjs.com/package/babel-jest)  
`jest` plugin for `@babel/core`
* [**`babel-loader`**](https://npmjs.com/package/babel-loader)  
`webpack` loader that allows transpiling of JavaScript files using `@babel/core`
* [**`clean-webpack-plugin`**](https://npmjs.com/package/clean-webpack-plugin)  
`webpack` plugin that removes build folders before building
* [**`css-loader`**](https://npmjs.com/package/css-loader)  
`webpack` loader that interprets @import and url() like import/require() and will resolve them
* [**`cssnano`**](https://npmjs.com/package/cssnano)  
Modular compression tool used with `optimize-css-assets-webpack-plugin` to minify styles
* [**`deep-freeze`**](https://npmjs.com/package/deep-freeze)  
Disable mutations on objects. Mainly used for testing `redux` reducers to ensure they are pure functions.
* [**`enzyme`**](https://npmjs.com/package/enzyme)  
Testing utility for `react` that makes it easier to assert, manipulate, and traverse your `react` components' output
* [**`enzyme-adapter-react-16`**](https://npmjs.com/package/enzyme-adapter-react-16)  
`enzyme` adapter to test with `react` 16
* [**`enzyme-to-json`**](https://npmjs.com/package/enzyme-to-json)  
Convert `enzyme` wrappers to a format compatible with `jest` snapshot testing
* [**`eslint`**](https://npmjs.com/package/eslint)  
JavaScript linter
* [**`eslint-plugin-flowtype`**](https://npmjs.com/package/eslint-plugin-flowtype)  
`eslint` plugin that enables linting for `flow-bin`
* [**`eslint-plugin-jest`**](https://npmjs.com/package/eslint-plugin-jest)  
`eslint` plugin that enables linting for `jest`
* [**`eslint-plugin-react`**](https://npmjs.com/package/eslint-plugin-react)  
`eslint` plugin that enables linting for `react`
* [**`file-loader`**](https://npmjs.com/package/file-loader)  
`webpack` loader that loads assets
* [**`flow-bin`**](https://npmjs.com/package/flow-bin)  
Type checker
* [**`flow-typed`**](https://npmjs.com/package/flow-typed)  
Repository of third-party library interface definitions for use with `flow-bin`
* [**`flow-webpack-plugin`**](https://npmjs.com/package/flow-webpack-plugin)  
`webpack` plugin that calls `flow-bin` during each production build
* [**`glob`**](https://npmjs.com/package/glob)  
Match files using the patterns the shell uses
* [**`html-webpack-plugin`**](https://npmjs.com/package/html-webpack-plugin)  
`webpack` plugin that generates HTML files
* [**`http-server`**](https://npmjs.com/package/http-server)  
Web server for previewing production builds
* [**`jest`**](https://npmjs.com/package/jest)  
JavaScript tester
* [**`jsdom`**](https://npmjs.com/package/jsdom)  
JavaScript-based headless browser used for testing
* [**`mini-css-extract-plugin`**](https://npmjs.com/package/mini-css-extract-plugin)  
Extract styles into separate files
* [**`node-sass`**](https://npmjs.com/package/node-sass)  
Extend CSS functionality
* [**`nodemon`**](https://npmjs.com/package/nodemon)  
Restart Node.js applications when file changes are detected
* [**`optimize-css-assets-webpack-plugin`**](https://npmjs.com/package/optimize-css-assets-webpack-plugin)  
Minify styles with `cssnano`
* [**`postcss`**](https://npmjs.com/package/postcss)  
Transform styles with JavaScript plugins. Used with `autoprefixer`.
* [**`postcss-loader`**](https://npmjs.com/package/postcss-loader)  
`webpack` loader that processes styles with `postcss`
* [**`purify-css`**](https://npmjs.com/package/purify-css)  
Delete unused styles in production build
* [**`purifycss-webpack`**](https://npmjs.com/package/purifycss-webpack)  
`webpack` plugin for `purify-css`
* [**`react-test-renderer`**](https://npmjs.com/package/react-test-renderer)
Test renderer for `react` components
* [**`redux-mock-store`**](https://npmjs.com/package/redux-mock-store)  
Mock store for testing `redux` asynchronous action creators and middleware
* [**`sass-loader`**](https://npmjs.com/package/sass-loader)  
`webpack` loader to compile `node-sass` into CSS
* [**`style-loader`**](https://npmjs.com/package/style-loader)  
`webpack` loader for adds CSS to the DOM by injecting a <style> tag
* [**`stylelint`**](https://npmjs.com/package/stylelint)  
Style linter
* [**`stylelint-config-recommended`**](https://npmjs.com/package/stylelint-config-recommended)  
Recommended configuration for `stylelint`
* [**`uglifyjs-webpack-plugin`**](https://npmjs.com/package/uglifyjs-webpack-plugin)  
Minify JavaScript
* [**`url-loader`**](https://npmjs.com/package/url-loader)  
`webpack` loader that transforms assets into base64 URIs
* [**`webpack`**](https://npmjs.com/package/webpack)  
Module bundler
* [**`webpack-cli`**](https://npmjs.com/package/webpack-cli)  
`webpack` CLI tool
* [**`webpack-dev-server`**](https://npmjs.com/package/webpack-dev-server)  
`webpack` development server that provides live reloading
* [**`webpack-merge`**](https://npmjs.com/package/webpack-merge)  
Merge arrays and objects for `webpack` configuration