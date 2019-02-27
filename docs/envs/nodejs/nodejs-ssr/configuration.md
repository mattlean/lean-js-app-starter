# Node.js + Server-Side Rendering: Configuration
## Babel
[Babel](https://babeljs.io) allows you to use newer JavaScript features that are currently not supported by browsers. The config file can be found in the project's root directory as [`.babelrc`](../../../.babelrc). For more info on configurating Babel, read the [Babel "Configure Babel" docs](https://babeljs.io/docs/en/configuration).

### Plugins
* [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html)  
  Enable class properties.
* [react-hot-loader/babel](https://github.com/gaearon/react-hot-loader)  
  Enable support for React Hot Loader.

### Presets
* [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)  
  A smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environments. Target environments are determined by the project's Browserslist.

  The `modules` option is set to `false` because by default we want webpack to handle the ES2015 modules instead of Babel so it can perform optimizations like [tree shaking](https://webpack.js.org/guides/tree-shaking). When running in a test environment, the option is set back to its default value (`"auto"`) so Babel can convert the ES2015 modules to a format Jest can understand.
* [@babel/preset-flow](https://babeljs.io/docs/en/babel-preset-flow)  
  Enable support for Flow.
* [@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react)  
  Enable support for React and JSX. When running in a development environment, the `development` option is set to `true` and enables useful developer features like [component stack traces](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html#component-stack-traces).

## Browserslist
[Browserslist](https://github.com/browserslist/browserslist) allows you to define browser versions the project should target. The config file can be found in the project's root directory as [`.browserslist`](../../../.browerslist). For more info on configuring Browserslist, read the [Browserslist README](https://github.com/browserslist/browserslist/blob/master/README.md).

@babel/preset-env uses this config to determine the minimum transforms and polyfills necessary for the build's JavaScript. [Autoprefixer](https://github.com/postcss/autoprefixer) also uses this to determine the minimum vendor prefixes necessary for the build's CSS.

By default [`.browserslist`](../../../.browerslist) is set to `defaults` which is the equivalent to `> 0.5%, last 2 versions, Firefox ESR, not dead`. It is highly recommended that you change this based on the browsers your users are using. If you use [Google Analytics](https://marketingplatform.google.com/about/analytics), you can generate usage stats from it and determine your config with [browserslist-ga](https://github.com/browserslist/browserslist-ga).

## ESLint
[ESLint](https://eslint.org) helps identify potential problems and deviations from code style guidelines in your JavaScript. The config file can be found in the project's root directory as [`.eslintrc`](../../../.eslintrc.json). The ignored file configuration can also be found in the root directory as [`.eslintignore`](../../../.eslintignore). For more info on configuring ESLint, read the [ESLint "Configuring ESLint" docs](https://eslint.org/docs/user-guide/configuring).

### Environments
* Browser: Supports browser global variables
* ES6 (ECMAScript 2015): Supports all ECMAScript 2015 features except for modules
* Node.js: Support Node.js global variables and Node.js scoping

### Config Extensions
* [`eslint:recommended`](https://eslint.org/docs/rules)  
  Enables recommended rules for general JavaScript as defined by ESLint.
* [`plugin:flowtype/recommended`](https://github.com/gajus/eslint-plugin-flowtype/blob/master/src/configs/recommended.json)  
  Enables recommended rules for Flow as defined by eslint-plugin-flowtype. Also sets [babel-eslint](https://github.com/babel/babel-eslint) as the parser since the default parser ([Espree](https://github.com/eslint/espree)) does not support Flow.
* [`plugin:jest/recommended`](https://github.com/jest-community/eslint-plugin-jest#rules)  
  Enables recommended rules for Jest as defined by eslint-plugin-jest.
* [`plugin:react/recommended`](https://github.com/yannickcr/eslint-plugin-react#recommended)  
  Enables recommended rules for React as defined by eslint-plugin-react.

### Parser Options
JSX and ES2015 module support is enabled.

### Plugins
* [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype)  
  Enables linting rules for Flow and allows us to use the `plugin:flowtype/recommended` config extension.
* [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)  
  Enables linting rules for Jest and allows us to use the `plugin:jest/recommended` config extension.
* [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)  
  Enables linting rules for React and allows us to use the `plugin:react/recommended` config extension.

### Rules
These specific rules override any rules set by config extensions and will trigger an error if broken.
* 2 space characters for each indentation
  * `switch` statements use 1 additional indentation
* Line endings must be Unix
* Strings use single quotes instead of double quotes
* No semicolons

### Settings
The React and Flow versions match the versions used in the project, as specified by [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react). These versions can be found in [`package.json`](../../../package.json).

### Ignored Files
[`jest.config.js`](../../../jest.config.js) is ignored as linting the Jest configuration is not necessary.

## Flow
[Flow](https://flow.org) is a static type checker for JavaScript. The config file can be found in the project's root directory as [`.flowconfig`](../../../.flowconfig). For more info on configuring Flow, read the [Flow ".flowconfig" docs](https://flow.org/en/docs/config).

### Ignored Files
All stats files generated by a build stats [`package.json`](../../../package.json) script.

### Options
Flow will look for files with the following extensions:
* css
* js
* json
* jsx
* mjs
* scss

Also these two lines are included so Flow will not error when styles are imported:
```
module.name_mapper.extension='css' -> 'empty/object'
module.name_mapper.extension='scss' -> 'empty/object'
```

By default Flow throws an error when it finds `require()` statements that use something other than a string literal. This has been disabled, mainly to allow the use of template literals.

## Jest
[Jest](https://jestjs.io) lets you build and run tests on your JavaScript. The config file can be found in the project's root directory as [`jest.config.js`](../../../jest.config.js). For more info on configuring Jest, read the [Jest "Configuring Jest" docs](https://jestjs.io/docs/en/configuration.html).

### Options
`moduleNameMapper` is set to the following so snapshots can handle assets like images and fonts as well as styles in spapshot tests:
```javascript
moduleNameMapper: {
  "\\.(eot|gif|jpg|jpeg|png|ttf|woff|woff2)$": "<rootDir>/src/__mocks__/fileMock.js",
  "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js"
},
```

`projects` separates the backend and frontend tests into different projects. The backend project will look for `.test.js` and `.test.jsx` files in [`src/back/`](../../../src/back). The project also sets `testEnvironment` to `node`. The frontend project will also look for `.test.js` and `.test.jsx` files in [`src/front/`](../../../src/front). The project also sets `testEnvironment` to `jsdom` and `snapshotSerializer` to [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json) so Enzyme wrappers are converted to a format compatible with Jest snapshot tests.

`testPathIgnorePatterns` will have Jest ignore the `node_modules/` (which is ignored by default) and [`build/`](../../../build) directories as well as [`src/back/config/test.js`](../../../src/back/config/test.js) and [`src/back/util/test.js`](../../../src/back/util/test.js) because these files are not tests and by default Jest looks for any filename that includes `test.js`.

## nodemon
[nodemon](https://nodemon.io) reruns Node.js applications when file changes are detected. For this project it is used to rerun package.json scripts to rebuild and rerun the application. The config file can be found in the project's root directory as [`nodemon.json`](../../../nodemon.json). This file sets what nodemon will watch and ignore by default. These settings can be overridden by CLI options.

### Watched Files
Watch `.js`, `.json`, and `.jsx` files, the [`config/`](../../../config) directory, [`nodemon.json`](../../../nodemon.json), and the [`src/back`](../../../src/back) directory.

### Ignored Files
All `.test.js` and `.test.jsx` files.

## package.json
[`package.json`](../../../package.json) is the main file that tells npm and Yarn about the project. For more info on the project's [`package.json`](../../../package.json) scripts, read the ["Developing: package.json Scripts" documentation](developing.md#packagejson-scripts). For more info on configuring [`package.json`](../../../package.json), read the [npm "package.json" docs](https://docs.npmjs.com/files/package.json).

## stylelint
[stylelint](https://stylelint.io) helps identify potential problems and deviations from code style guidelines in your CSS and Sass. The config file can be found in the project's root directory as [`.stylelintrc`](../../../.stylelintrc). For more info on configuring stylelint, read the [stylelint "Configuration" docs](https://stylelint.io/user-guide/configuration).

### Config Extensions
* [`stylelint-config-recommended`](https://github.com/stylelint/stylelint-config-recommended)  
Turns on all [possible errors](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors) in stylelint.

### Rules
These specific rules override any rules set by config extensions and will trigger a violation if broken.
* 2 space characters for each indentation
* Line endings must be Unix

## webpack
[webpack](https://webpack.js.org) builds the project. The config files can be found in the [config/](../../../config) directory. For more info on configuring webpack, read the [webpack "Configuration" docs](https://webpack.js.org/configuration).

### Development
#### Entry
[`webpack.config.js`](../../../webpack.config.js)
```javascript
entry: `${PATHS.src}/main.js`,
```
Start building from `src/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

#### Resolve
[`webpack.config.js`](../../../webpack.config.js)
```javascript
resolve: { extensions: ['.js', '.json'] },
```
Look for files with .js or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

#### Target
[`webpack.config.js`](../../../webpack.config.js)
```javascript
target: 'node'
```
Sets target environment to Node.js. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

#### Externals
[`webpack.config.js`](../../../webpack.config.js)
```javascript
parts.setExternals(),
```
Exclude dependencies in webpack bundling process with webpack node modules externals. More info can be found in the [webpack "Externals" docs](https://webpack.js.org/configuration/externals) and the [webpack  node modules externals README](https://github.com/liady/webpack-node-externals/blob/master/README.md).

#### Compile JavaScript
[`webpack.config.js`](../../../webpack.config.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

#### Output
[`config/development.js`](../../../config/development.js)
```javascript
output: {
  filename: 'app.js',
  path: `${PATHS.build}/development`
},
```
Output bundle at `build/development/` and name the bundled JavaScript `app.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

#### Delete old build
[`config/development.js`](../../../config/development.js)
```javascript
parts.cleanPaths(['build/development']),
```
Delete old development build at `build/development/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

#### Generate source maps
[`config/development.js`](../../../config/development.js)
```javascript
parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
```
Enable JavaScript source maps with `'cheap-module-eval-source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

### Production
#### Entry
[`webpack.config.js`](../../../webpack.config.js)
```javascript
entry: `${PATHS.src}/main.js`,
```
Start building from `src/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

#### Resolve
[`webpack.config.js`](../../../webpack.config.js)
```javascript
resolve: { extensions: ['.js', '.json'] },
```
Look for files with .js or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

#### Target
[`webpack.config.js`](../../../webpack.config.js)
```javascript
target: 'node'
```
Sets target environment to Node.js. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

#### Externals
[`webpack.config.js`](../../../webpack.config.js)
```javascript
parts.setExternals(),
```
Exclude dependencies in webpack bundling process with webpack node modules externals. More info can be found in the [webpack "Externals" docs](https://webpack.js.org/configuration/externals) and the [webpack  node modules externals README](https://github.com/liady/webpack-node-externals/blob/master/README.md).

#### Compile JavaScript
[`webpack.config.js`](../../../webpack.config.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

#### Output
[`config/production.js`](../../../config/production.js)
```javascript
output: {
  filename: 'app.js',
  path: `${PATHS.build}/production`
},
```
Output bundle at `build/production/` and name the bundled JavaScript `app.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

#### Delete old build
[`config/production.js`](../../../config/production.js)
```javascript
parts.cleanPaths(['build/production']),
```
Delete old development build at `build/production/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

#### Check types
[`config/production.js`](../../../config/production.js)
```javascript
parts.checkTypes(),
```
Check types in JavaScript with Flow using [flow-webpack-plugin](https://github.com/happylynx/flow-webpack-plugin).

#### Minify JavaScript
[`config/production.js`](../../../config/production.js)
```javascript
parts.minJS(),
```
Minify JavaScript with [UglifyJS](http://lisperator.net/uglifyjs) using the [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

#### Generate source maps
[`config/production.js`](../../../config/production.js)
```javascript
parts.genSourceMaps({ type: 'source-map' })
```
Enable JavaScript source maps with `'source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).