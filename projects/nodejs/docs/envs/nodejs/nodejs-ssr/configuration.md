# Node.js + Server-Side Rendering: Configuration
## Babel
[Babel](https://babeljs.io) allows you to use newer JavaScript features that are currently not supported by browsers. The config file can be found in the project's root directory as [`.babelrc`](../../../../.babelrc). For more info on configurating Babel, read the [Babel "Configure Babel" docs](https://babeljs.io/docs/en/configuration).

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
[Browserslist](https://github.com/browserslist/browserslist) allows you to define browser versions the project should target. The config file can be found in the project's root directory as [`.browserslist`](../../../../.browerslist). For more info on configuring Browserslist, read the [Browserslist README](https://github.com/browserslist/browserslist/blob/master/README.md).

@babel/preset-env uses this config to determine the minimum transforms and polyfills necessary for the build's JavaScript. [Autoprefixer](https://github.com/postcss/autoprefixer) also uses this to determine the minimum vendor prefixes necessary for the build's CSS.

By default [`.browserslist`](../../../../.browerslist) is set to `defaults` which is the equivalent to `> 0.5%, last 2 versions, Firefox ESR, not dead`. It is highly recommended that you change this based on the browsers your users are using. If you use [Google Analytics](https://marketingplatform.google.com/about/analytics), you can generate usage stats from it and determine your config with [browserslist-ga](https://github.com/browserslist/browserslist-ga).

## ESLint
[ESLint](https://eslint.org) helps identify potential problems and deviations from code style guidelines in your JavaScript. The config file can be found in the project's root directory as [`.eslintrc`](../../../../.eslintrc.json). The ignored file configuration can also be found in the root directory as [`.eslintignore`](../../../../.eslintignore). For more info on configuring ESLint, read the [ESLint "Configuring ESLint" docs](https://eslint.org/docs/user-guide/configuring).

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
The React and Flow versions match the versions used in the project, as specified by [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react). These versions can be found in [`package.json`](../../../../package.json).

### Ignored Files
[`jest.config.js`](../../../../jest.config.js) is ignored as linting the Jest configuration is not necessary.

## Flow
[Flow](https://flow.org) is a static type checker for JavaScript. The config file can be found in the project's root directory as [`.flowconfig`](../../../../.flowconfig). For more info on configuring Flow, read the [Flow ".flowconfig" docs](https://flow.org/en/docs/config).

### Ignored Files
All stats files generated by a build stats [`package.json`](../../../../package.json) script.

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
[Jest](https://jestjs.io) lets you build and run tests on your JavaScript. The config file can be found in the project's root directory as [`jest.config.js`](../../../../jest.config.js). For more info on configuring Jest, read the [Jest "Configuring Jest" docs](https://jestjs.io/docs/en/configuration.html).

### Options
`moduleNameMapper` is set to the following so snapshots can handle assets like images and fonts as well as styles in spapshot tests:
```javascript
moduleNameMapper: {
  "\\.(eot|gif|jpg|jpeg|png|ttf|woff|woff2)$": "<rootDir>/src/__mocks__/fileMock.js",
  "\\.(css|scss)$": "<rootDir>/src/__mocks__/styleMock.js"
},
```

`projects` separates the backend and frontend tests into different projects. The backend project will look for `.test.js` and `.test.jsx` files in [`src/back/`](../../../../src/back). The project also sets `testEnvironment` to `node`. The frontend project will also look for `.test.js` and `.test.jsx` files in [`src/front/`](../../../../src/front). The project also sets `testEnvironment` to `jsdom` and `snapshotSerializer` to [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json) so Enzyme wrappers are converted to a format compatible with Jest snapshot tests.

`testPathIgnorePatterns` will have Jest ignore the `node_modules/` (which is ignored by default) and `build/` directories as well as [`src/back/config/test.js`](../../../../src/back/config/test.js) and [`src/back/util/test.js`](../../../../src/back/util/test.js) because these files are not tests and by default Jest looks for any filename that includes `test.js`.

## nodemon
[nodemon](https://nodemon.io) reruns Node.js applications when file changes are detected. For this project it is used to rerun package.json scripts to rebuild and rerun the application. The config file can be found in the project's root directory as [`nodemon.json`](../../../../nodemon.json). This file sets what nodemon will watch and ignore by default. These settings can be overridden by CLI options.

### Watched Files
Watch `.js`, `.json`, and `.jsx` files, the [`config/`](../../../../config) directory, [`nodemon.json`](../../../../nodemon.json), and the [`src/back`](../../../../src/back) directory.

### Ignored Files
All `.test.js` and `.test.jsx` files.

## package.json
[`package.json`](../../../../package.json) is the main file that tells npm and Yarn about the project. For more info on the project's [`package.json`](../../../../package.json) scripts, read the ["Developing: package.json Scripts" documentation](developing.md#packagejson-scripts). For more info on configuring [`package.json`](../../../../package.json), read the [npm "package.json" docs](https://docs.npmjs.com/files/package.json).

## stylelint
[stylelint](https://stylelint.io) helps identify potential problems and deviations from code style guidelines in your CSS and Sass. The config file can be found in the project's root directory as [`.stylelintrc`](../../../../.stylelintrc). For more info on configuring stylelint, read the [stylelint "Configuration" docs](https://stylelint.io/user-guide/configuration).

### Config Extensions
* [`stylelint-config-recommended`](https://github.com/stylelint/stylelint-config-recommended)  
Turns on all [possible errors](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md#possible-errors) in stylelint.

### Rules
These specific rules override any rules set by config extensions and will trigger a violation if broken.
* 2 space characters for each indentation
* Line endings must be Unix

## webpack
[webpack](https://webpack.js.org) builds the project. The config files can be found in the [config/](../../../../config) directory. For more info on configuring webpack, read the [webpack "Configuration" docs](https://webpack.js.org/configuration).

### Backend
#### Development
##### Entry
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
entry: `${PATHS.back.src}/main.js`,
```
Start building from `src/back/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] },
```
Look for files with `.js`, `.jsx` or `.json` extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
target: 'node'
```
Sets target environment to Node.js. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Externals
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.setExternals(),
```
Exclude dependencies in webpack bundling process with webpack node modules externals. More info can be found in the [webpack "Externals" docs](https://webpack.js.org/configuration/externals) and the [webpack  node modules externals README](https://github.com/liady/webpack-node-externals/blob/master/README.md).

##### Compile JavaScript
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.loadJS({ include: PATHS.src }),
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Set Free Variable
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.setFreeVariable('__isBrowser__', false)
```
Create `__isBrowser__` free variable which determines if Redux store is being created within the browser or Node.js environment.

##### Output
[`config/back/development.js`](../../../../config/back/development.js)
```javascript
output: {
  filename: 'app.js',
  path: `${PATHS.back.build}/development`
},
```
Output bundle at `build/back/development/` and name the bundled JavaScript `app.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/back/development.js`](../../../../config/back/development.js)
```javascript
parts.cleanPaths(['build/back/development']),
```
Delete old development build at `build/back/development` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Generate source maps
[`config/back/development.js`](../../../../config/back/development.js)
```javascript
parts.genSourceMaps({ type: 'cheap-module-eval-source-map' })
```
Enable JavaScript source maps with `'cheap-module-eval-source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

#### Production
##### Entry
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
entry: `${PATHS.back.src}/main.js`,
```
Start building from `src/back/main.js`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] },
```
Look for files with `.js`, `.jsx` or `.json` extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Target
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
target: 'node'
```
Sets target environment to Node.js. More info can be found in the [webpack "Target" docs](https://webpack.js.org/configuration/target).

##### Externals
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.setExternals(),
```
Exclude dependencies in webpack bundling process with webpack node modules externals. More info can be found in the [webpack "Externals" docs](https://webpack.js.org/configuration/externals) and the [webpack  node modules externals README](https://github.com/liady/webpack-node-externals/blob/master/README.md).

##### Compile JavaScript
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.loadJS({ include: PATHS.src }),
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Set Free Variable
[`config/back/index.js`](../../../../config/back/index.js)
```javascript
parts.setFreeVariable('__isBrowser__', false)
```
Create `__isBrowser__` free variable which determines when Redux store is being created within the browser or Node.js environment.

##### Output
[`config/back/production.js`](../../../../config/back/production.js)
```javascript
output: {
  filename: 'app.js',
  path: `${PATHS.back.build}/production`
}
```
Output bundle at `build/back/production/` and name the bundled JavaScript `app.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/back/production.js`](../../../../config/back/production.js)
```javascript
parts.cleanPaths(['build/back/production']),
```
Delete old development build at `build/back/production/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Check types
[`config/back/production.js`](../../../../config/back/production.js)
```javascript
parts.checkTypes(),
```
Check types in JavaScript with Flow using [flow-webpack-plugin](https://github.com/happylynx/flow-webpack-plugin).

##### Minify JavaScript
[`config/back/production.js`](../../../../config/back/production.js)
```javascript
parts.minJS(),
```
Minify JavaScript with [UglifyJS](http://lisperator.net/uglifyjs) using the [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

##### Generate source maps
[`config/back/production.js`](../../../../config/back/production.js)
```javascript
parts.genSourceMaps({ type: 'source-map' })
```
Enable JavaScript source maps with `'source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

### Frontend
#### Development
##### Entry
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
entry: `${PATHS.src}/main.jsx`,
```
Start building from `src/front/main.jsx`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] }
```
Look for files with `.js`, `.jsx`, or `.json` extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Compile JavaScript
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.loadJS({ include: PATHS.src }),
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Create HTML
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.loadHTML({ template: `${PATHS.src}/index.html` }),
```
Create an HTML file using the template at `src/front/index.html` with [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin).

##### Set Free Variable
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.setFreeVariable('__isBrowser__', true)
```
Create `__isBrowser__` free variable which determines if Redux store is being created within the browser or Node.js environment.

##### Output
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
output: {
  chunkFilename: '[name].js',
  filename: '[name].js',
  path: `${PATHS.build}/development`
}
```
Output bundle at `build/front/development/` and name the bundled JavaScript `main.js`. More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.cleanPaths(['build/front/development']),
```
Delete old development build at `build/front/development/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Setup development server
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.setupDevServer({
  host: process.env.HOST,
  port: process.env.PORT,
  historyApiFallback: true,
  hot: true,
  proxy: {
    '/api': {
      target: 'http://localhost:9001/api',
      pathRewrite: { '^/api': '' }
    }
  }
}),
```
Host [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Host and port are determined by the Node.js `process.env` `HOST` and `PORT` variables respectively. If they are not set, the default host will be set to `localhost` and the port will be set to `8080`.

`historyApiFallback` is set to `true` to allow use of the [HTML5 History API](https://developer.mozilla.org/en-US/docs/Web/API/History) which allows the use of [React Router's BrowserRouter](https://reacttraining.com/react-router/web/api/browserrouter).

`hot` is set to `true` to enable webpack's [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement) which allows the use of [React Hot Loader](https://github.com/gaearon/react-hot-loader).

`proxy` points to the development backend API at [localhost:9001/api](http://localhost:9001/api) so API requests can be sent within the same domain even though the frontend and backend development servers are separate. `pathRewrite` prevents `/api` to be passed along in the API request.

More info can be found in the [webpack "DevServer" docs](https://webpack.js.org/configuration/dev-server).

##### Load styles
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.loadStyles(),
```
Load all Sass and compile them into CSS using [Sass Loader](https://github.com/webpack-contrib/sass-loader). Then go through possible `@import` and `url()` lookups within all CSS and treat them like an ES2015 `import` or `require()` using [CSS Loader](https://github.com/webpack-contrib/css-loader). Finally inject styling into the DOM using [Style Loader](https://github.com/webpack-contrib/style-loader) so styles can be hot reloaded with webpack-dev-server. Also generate CSS source maps.

##### Load images
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.loadImgs(),
```
Load image files with `.gif`, `.jpg`, `.jpeg`, or `.png` extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

#### Load fonts
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.loadFonts(),
```
Load font files with `.eot`, `.tff`, `.woff`, or `.woff2` extensions and transform them into base64 URIs which are inlined into the JavaScript bundle using [url-loader](https://github.com/webpack-contrib/url-loader).

##### Generate source maps
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.genSourceMaps({ type: 'cheap-module-eval-source-map' }),
```
Enable JavaScript source maps with `'cheap-module-eval-source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

##### Generate asset list
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.genAssetList({ format: 'object', key: 'name' })
```
Generate asset list to be referenced in backend bundling process for server-side rendering support.

#### Production
##### Entry
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
entry: `${PATHS.src}/main.jsx`,
```
Start building from `src/front/main.jsx`. More info can be found in the [webpack "Entry and Context" docs](https://webpack.js.org/configuration/entry-context).

##### Resolve
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
resolve: { extensions: ['.js', '.jsx', '.json'] }
```
Look for files with `.js`, `.jsx`, or `.json` extensions. More info can be found in the [webpack "Resolve" docs](https://webpack.js.org/configuration/resolve).

##### Compile JavaScript
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.loadJS({ include: PATHS.src }),
```
Load all JavaScript in `src/` and compile them with Babel using [Babel Loader](https://github.com/babel/babel-loader).

##### Create HTML
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.loadHTML({ template: `${PATHS.src}/index.html` }),
```
Create an HTML file using the template at `src/front/index.html` with [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin).

##### Set Free Variable
[`config/front/index.js`](../../../../config/front/index.js)
```javascript
parts.setFreeVariable('__isBrowser__', true)
```
Create `__isBrowser__` free variable which determines if Redux store is being created within the browser or Node.js environment.

##### Output
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
output: {
  chunkFilename: '[name].[chunkhash:4].js',
  filename: '[name].[chunkhash:4].js',
  path: `${PATHS.front.build}/production`
}
```
Output bundle at `build/front/production/` and name the bundled JavaScript `main.[chunkhash].js`. All other built files will follow the `[name].[chunkhash:4].[ext]` format in their filenames. The part of the chunkhash in the filename is used as a fingerprint to allow for [cache invalidation](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses). More info in the [webpack "Output" docs](https://webpack.js.org/configuration/output).

##### Delete old build
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.cleanPaths(['build/front/production']),
```
Delete old development build at `build/front/production/` with [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin).

##### Check types
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.checkTypes(),
```
Check types in JavaScript with Flow using [flow-webpack-plugin](https://github.com/happylynx/flow-webpack-plugin).

##### Minify JavaScript
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.minJS(),
```
Minify JavaScript with [UglifyJS](http://lisperator.net/uglifyjs) using the [UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin).

##### Minify CSS
[`config/front/production.js`](../../../../config/front/production.js)
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
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.extractStyles({
  filename: '[name].[contenthash:4].css',
  use: ['css-loader', 'sass-loader', parts.autoprefix()]
}),
```
First use [PostCSS Loader](https://github.com/postcss/postcss-loader) with the [Autoprefixer](https://github.com/postcss/autoprefixer) plugin to parse styles and add vendor prefixes based on targeted browsers in the project's Browserslist. Then load all Sass and compile them into CSS using [Sass Loader](https://github.com/webpack-contrib/sass-loader). Then go through possible `@import` and `url()` lookups within all CSS and treat them like an ES2015 `import` or `require()` using [CSS Loader](https://github.com/webpack-contrib/css-loader).

Finally separate CSS into its own file called `main.[contenthash:4].css` using [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin). Like the chunkhash used in the output option, part of the contenthash is used as a fingerprint to allow for [cache invalidation](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses). The reason why styles use contenthashes instead of chunkhashes is because using chunkhashes would cause both JavaScript and CSS files to invalidate if either is edited. For example, in this scenario if you were to only edit your style source, the JavaScript bundles would become invalidated as well even though the JavaScript source has not changed. By using contenthashes we can avoid this problem by separating them and making sure JavaScript and CSS fingerprints are independent of each other, ensuring their caches remain valid as long as possible.

##### Delete unused CSS
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.purifyCSS({ paths: glob.sync(`${PATHS.src}/**/*.{js,jsx}`, { nodir: true }) }),
```
Remove unused selectors in CSS using [PurifyCSS Plugin](https://github.com/webpack-contrib/purifycss-webpack).

##### Load images
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.loadImgs({
  options: {
    name: `${PATHS.assets}/imgs/[name].[hash:4].[ext]`
  },
  type: 'file'
}),
```
Load image files with `.gif`, `.jpg`, `.jpeg`, or `.png` extensions and output them in `/assets/imgs/` with [file-loader](https://github.com/webpack-contrib/file-loader).

##### Load fonts
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.loadFonts({
  options: {
    name: `${PATHS.assets}/fonts/[name].[hash:4].[ext]`
  },
  type: 'file'
}),
```
Load font files with `.eot`, `.tff`, `.woff`, or `.woff2` extensions and output them in `/assets/imgs/` with [file-loader](https://github.com/webpack-contrib/file-loader).

##### Generate source maps
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
parts.genSourceMaps({ type: 'source-map' }),
```
Enable JavaScript source maps with `'source-map'`. More info can be found in the [webpack "Devtool" docs](https://webpack.js.org/configuration/devtool).

##### Bundle splitting, manifest, and records
[`config/front/production.js`](../../../../config/front/production.js)
```javascript
{
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    runtimeChunk: { name: 'manifest' }
  },

  recordsPath: `${PATHS.root}/records.json`
},
```
1. Separate dependencies in `node_modules/` into `vendor.[chunkhash:4].js`.
2. Create manifest to have webpack load the project faster instead of waiting for the vendor bundle to be loaded.
3. Create `records.json` to store module IDs across separate builds. This allows the generation of longer lasting filenames, makes sure that code split parts gain correct caching behavior, and that modules aren't reordered or moved to another chunk during the bundling process which results to less cache invalidations.

##### Generate asset list
[`config/front/development.js`](../../../../config/front/development.js)
```javascript
parts.genAssetList({ format: 'object', key: 'name' })
```
Generate asset list to be referenced in backend bundling process for server-side rendering support.