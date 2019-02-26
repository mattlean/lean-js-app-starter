# Desktop: Configuration
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

## electron-builder
[electron-builder](https://electron.build/configuration/configuration) builds the app into an executable for macOS, Windows, or Linux. The config utilizes [`package.json`](../../../package.json). For more info on configurating electron-builder, read the [electron-builder "Common Configuration" docs](https://electron.build/configuration/configuration).

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
`jest.config.js` is ignored as linting the Jest configuration is not necessary.

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

`snapshotSerializer` is set to [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json) so Enzyme wrappers are converted to a format compatible with Jest snapshot tests.

`testPathIgnorePatterns` ignores the [`build/`](../../../build) and `node_modules/` directories.

## nodemon
[nodemon](https://nodemon.io) reruns Node.js applications when file changes are detected. For this project it is used to rerun package.json scripts to rebuild and rerun the application. The config file can be found in the project's root directory as [`nodemon.json`](../../../nodemon.json). This file sets what nodemon will watch and ignore by default. These settings can be overridden by CLI options.

### Watched Files
Watch `.js`, `.json`, and `.jsx` files, the [`config/`](../../../config) directory, [`nodemon.json`](../../../nodemon.json), [`src/main/`](../../../src/main), and [`webpack.config.js`](../../../webpack.config.js).

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
[webpack](https://webpack.js.org) builds the project. The config files can be found in the project's root directory as [`webpack.config.js`](../../../webpack.config.js) and within [`config/`](../../../config). For more info on configuring webpack, read the [webpack "Configuration" docs](https://webpack.js.org/configuration).

### Main Process
#### Development
##### Entry
[`config/main/index.js`](../../../config/main/index.js)
```javascript
entry: `${PATHS.src}/main.js`,
```
Start building from `src/main/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Node
[`config/main/index.js`](../../../config/main/index.js)
```javascript
node: { __dirname: false },
```
Used for setting correct file locations in the bundle to work with Electron. More info can be found in the [webpack "Node" docs](https://webpack.js.org/configuration/node).

##### Resolve
[`config/main/index.js`](../../../config/main/index.js)
```javascript
resolve: { extensions: ['.js', '.json'] },
```
Look for files with .js or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/main/index.js`](../../../config/main/index.js)
```javascript
target: 'electron-main'
```
Sets target environment to Electron's main process. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Compile JavaScript
[`config/main/index.js`](../../../config/main/index.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/main/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Output
[`config/main/development.js`](../../../config/main/development.js)
```javascript
output: {
  filename: 'main.js',
  path: PATHS.build
}
```
Output bundle at `build/development/main/` and name the bundled JavaScript `main.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/main/development.js`](../../../config/main/development.js)
```javascript
parts.cleanPaths(['build/development/main']),
```
Delete old development build at `build/development/main/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Generate source maps
[`config/main/development.js`](../../../config/main/development.js)
```javascript
parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
```
Enable JavaScript source maps with `'cheap-module-eval-source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

#### Production
##### Entry
[`config/main/index.js`](../../../config/main/index.js)
```javascript
entry: `${PATHS.src}/main.js`,
```
Start building from `src/main/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Node
[`config/main/index.js`](../../../config/main/index.js)
```javascript
node: { __dirname: false },
```
Used for setting correct file locations in the bundle to work with Electron. More info can be found in the [webpack "Node" docs](https://webpack.js.org/configuration/node).

##### Resolve
[`config/main/index.js`](../../../config/main/index.js)
```javascript
resolve: { extensions: ['.js', '.json'] },
```
Look for files with .js or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/main/index.js`](../../../config/main/index.js)
```javascript
target: 'electron-main'
```
Sets target environment to Electron's main process. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Compile JavaScript
[`config/main/index.js`](../../../config/main/index.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/main/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Output
[`config/main/production.js`](../../../config/main/production.js)
```javascript
output: {
  filename: 'main.js',
  path: PATHS.build
}
```
Output bundle at `build/production/webpack/` and name the bundled JavaScript `main.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Check types
[`config/main/production.js`](../../../config/main/production.js)
```javascript
parts.checkTypes(),
```
Check types in JavaScript with Flow using [flow-webpack-plugin](https://github.com/happylynx/flow-webpack-plugin).

##### Minify JavaScript
[`config/main/production.js`](../../../config/main/production.js)
```javascript
parts.minJS(),
```
Minify JavaScript with [UglifyJS](http://lisperator.net/uglifyjs) using the [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

##### Generate source maps
[`config/main/production.js`](../../../config/main/production.js)
```javascript
parts.genSourceMaps({ type: 'source-map' })
```
Enable JavaScript source maps with `'source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

### Renderer Process
#### Development
##### Entry
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
entry: `${PATHS.src}/main.jsx`,
```
Start building from `src/renderer/main.jsx`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] },
```
Look for files with .js, .jsx, or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
target: 'electron-renderer'
```
Sets target environment to Electron's renderer process. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Compile JavaScript
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/renderer/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Output
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
{
  output: {
    filename: 'renderer.js',
    path: PATHS.build
  }
},
```
Output bundle at `build/development/renderer/` and name the bundled JavaScript `renderer.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.cleanPaths(['build/development/renderer']),
```
Delete old development build at `build/development/renderer/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Setup development server
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.setupDevServer({
  host: HOST,
  port: PORT,
  hot: true
}),
```
Host [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Host and port are determined by the Node.js `process.env` `HOST` and `PORT` variables respectively. If they are not set, the default host will be set to `localhost` and the port will be set to `8080`.

`hot` is set to `true` to enable webpack's [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement) which allows the use of [React Hot Loader](https://github.com/gaearon/react-hot-loader).

More info can be found in the [webpack "DevServer" docs](https://webpack.js.org/configuration/dev-server).

##### Create HTML
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.loadHTML({
  template: `${PATHS.src}/index.html`,
  templateParameters: { csp: `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-eval' http://${HOST}:${PORT} ws://${HOST}:${PORT} blob: data:">` }
}),
```
Create an HTML file using the template at `src/renderer/index.html` with [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin). Template parameters set the content security policy to address some Electron security issues. More info can be found in the [Electron "Security, Native Capabilities, and Your Responsibility" docs](https://electronjs.org/docs/tutorial/security).

##### Load styles
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.loadStyles(),
```
Load all Sass and compile them into CSS using [Sass Loader](https://github.com/webpack-contrib/sass-loader). Then go through possible `@import` and `url()` lookups within all CSS and treat them like an ES2015 `import` or `require()` using [CSS Loader](https://github.com/webpack-contrib/css-loader). Finally inject styling into the DOM using [Style Loader](https://github.com/webpack-contrib/style-loader) so styles can be hot reloaded with webpack-dev-server. Also generate CSS source maps.

##### Load images
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.loadImgs(),
```
Load image files with .gif, .jpg, .jpeg, or .png extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

##### Load fonts
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.loadFonts(),
```
Load font files with .eot, .tff, .woff, or .woff2 extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

##### Generate source maps
[`config/renderer/development.js`](../../../config/renderer/development.js)
```javascript
parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
```
Enable JavaScript source maps with `'cheap-module-eval-source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

#### Production
##### Entry
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
entry: `${PATHS.src}/main.jsx`,
```
Start building from `src/renderer/main.jsx`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] },
```
Look for files with .js, .jsx, or .json extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
target: 'electron-renderer'
```
Sets target environment to Electron's renderer process. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Compile JavaScript
[`config/renderer/index.js`](../../../config/renderer/index.js)
```javascript
parts.loadJS({ include: PATHS.src })
```
Load all JavaScript in `src/renderer/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Output
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
{
  output: {
    filename: 'renderer.js',
    path: PATHS.build
  }
},
```
Output bundle at `build/production/webpack` and name the bundled JavaScript `renderer.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.cleanPaths(['build/production/webpack']),
```
Delete old development build at `build/production/webpack/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Check types
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.checkTypes(),
```
Check types in JavaScript with Flow using [flow-webpack-plugin](https://github.com/happylynx/flow-webpack-plugin).

##### Create HTML
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.loadHTML({
  template: `${PATHS.renderer.src}/index.html`,
  templateParameters: { csp: '<meta http-equiv="Content-Security-Policy" content="script-src \'self\'">' }
}),
```
Create an HTML file using the template at `src/renderer/index.html` with [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin). Template parameters set the content security policy to address some Electron security issues. More info can be found in the [Electron "Security, Native Capabilities, and Your Responsibility" docs](https://electronjs.org/docs/tutorial/security).

##### Minify JavaScript
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.minJS(),
```
Minify JavaScript with [UglifyJS](http://lisperator.net/uglifyjs) using the [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

##### Minify CSS
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.minCSS({
  options: {
    discardComments: { removeAll: true },
    safe: true
  }
}),
```
Minify CSS with [Optimize CSS Assets Webpack Plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin) using [cssnano](https://cssnano.co) while discarding all comments and running in safe mode to avoid potentially unsafe transformations.

##### Load and extract styles
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.extractStyles({
  filename: 'style.css',
  use: ['css-loader', 'sass-loader', parts.autoprefix()]
}),
```
First use [PostCSS Loader](https://github.com/postcss/postcss-loader) with the [Autoprefixer](https://github.com/postcss/autoprefixer) plugin to parse styles and add vendor prefixes based on targeted browsers in the project's Browserslist. Then load all Sass and compile them into CSS using [Sass Loader](https://github.com/webpack-contrib/sass-loader). Then go through possible `@import` and `url()` lookups within all CSS and treat them like an ES2015 `import` or `require()` using [CSS Loader](https://github.com/webpack-contrib/css-loader). Finally separate CSS into its own file called `style.css` using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin).

##### Delete unused CSS
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.purifyCSS({ paths: glob.sync(`${PATHS.renderer.src}/**/*.{js,jsx}`, { nodir: true }) }),
```
Remove unused selectors in CSS using [PurifyCSS Plugin](https://github.com/webpack-contrib/purifycss-webpack).

##### Load images
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.loadImgs(),
```
Load image files with .gif, .jpg, .jpeg, or .png extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

##### Load fonts
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.loadFonts(),
```
Load font files with .eot, .tff, .woff, or .woff2 extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

#### Generate source maps
[`config/renderer/production.js`](../../../config/renderer/production.js)
```javascript
parts.genSourceMaps({ type: 'source-map' })
```
Enable JavaScript source maps with `'source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).