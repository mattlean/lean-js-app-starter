# Web Browser: Developing
## Folder Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* [`config`](../../../config): webpack environment configuration
* [`src`](../../../src): Application source code
  * [`__mocks__`](../../../src/__mocks__): Mock test files
  * [`actions`](../../../src/actions): Redux actions
  * [`assets`](../../../src/assets): Images, fonts & other assets
  * [`components`](../../../src/components): React presentational components
  * [`containers`](../../../src/containers): Redux connected React components
  * [`reducers`](../../../src/reducers): Redux reducers
  * [`types`](../../../src/types): Flow type definitions
  * [`util`](../../../src/util): Utility scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Development Server
To run the development server, run the `start:dev:watch` [`package.json`](../../../package.json) script. This will start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) which will automatically create a development build and host it at [localhost:8080](http://localhost:8080). Any changes you do to the codebase will automatically update the app. Any errors that occur will show up in the terminal where you are running the script as well as the browser.

### Creating JavaScript Files
When creating JavaScript files, if it includes any JSX at all, it is recommended that you end the filename with `.jsx`, otherwise end it with `.js`. This is to make it easier to distinguish when files use JSX or not.

### Root Container
In the entry of the app source ([`main.jsx`](../../../src/main.jsx)) you will find the [`Root` container](../../../src/containers/Root.jsx) being rendered. This is the app's top-level container, so all other components/containers should be built under it.

By default the [`Root` container](../../../src/containers/Root.jsx) handles Redux setup and routing, but you are free to change its behavior to handle whatever you need. The only caveat is that you need to ensure this [`Root` container](../../../src/containers/Root.jsx) always remains the top-level container as it is setup to hot reload itself and its children.

### Redux Store
The app source comes with one utility script called [`store.js`](../../../src/util/store.js) which exports a function called `createStore`. You can see it already being used in [`main.jsx`](../../../src/main.jsx).

#### Arguments
1. `reducer` *(Function)*: A Redux reducer that is required. Likely the root reducer that combines all of the reducers for your app.
2. `preloadedState` *(any)*: An optional initial state for the store. If `null` or `undefined` is passed, it will be ignored.
3. `middlewares` *(Array)*: An optional array of Redux middlewares. If `null` or `undefined` is passed, it will be ignored.
4. `devMiddlewares` *(Array)*: An optional array of Redux middlewares only to be included when the store is running in a development environment.

#### Returns
*(Store)*: A Redux store that is compatible with Redux DevTools.

### Type Checking
Run the `flow` [`package.json`](../../../package.json) script to run [Flow](https://flow.org) to type check your code. It will then type check all `.js`, `.jsx`, `.mjs`, and `.json` files that have the following comment at the top their code:
```javascript
// @flow
```

Running the `flow` script will start the Flow background process. If you need to end this process, run the `flow stop` script.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../tools/sublime_text.md).

If you want to configure Flow, you can edit [`.flowconfig`](../../../.flowconfig). For more information on the config, read the ["Configuration: Flow" documentation](configuration.md#flow).

### Linting
You can use the following [`package.json`](../../../package.json) scripts to lint your code:

* `lint:js` or `lint`: Lint JavaScript with [ESLint](https://eslint.org)
* `lint:styles`: Lint CSS and Sass with [stylelint](https://stylelint.io)

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint with ESLint and stylelint. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../tools/sublime_text.md).

If you want to configure the linters, you can edit the following files:

* [`.eslintrc.json`](../../../.eslintrc.json): ESLint configuration
* [`.stylelintrc`](../../../.stylelintrc): stylelint configuration

For more information on the ESLint config, read the ["Configuration: ESLint" documentation](configuration.md#eslint). For more information on the stylelint config, read the ["Configuration: stylelint" documentation](configuration.md#stylelint).

### Testing
#### Creating Tests
When creating tests, it is recommended that you end your file names with `.test.js` (or `.test.jsx` if it uses JSX) and put them in a `__tests__` folder.

If you are snapshot testing, you can use or [Enzyme](https://airbnb.io/enzyme) or [React test renderer](https://reactjs.org/docs/test-renderer.html).

#### Running Tests
Use the following [`package.json`](../../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `test`: Run all tests
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

If you want to configure Jest, you can edit [`jest.config.js`](../../../jest.config.js). For more information on the config, read the ["Configuration: Jest" documentation](configuration.md#jest).

#### Code Coverage
Use the `test:coverage` [`package.json`](../../../package.json) script to run [Istanbul](https://istanbul.js.org) to collect coverage information. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).

### Debugging
Redux DevTools is already setup for you in the codebase, all you need to do is install the extension for your browser: https://github.com/zalmoxisus/redux-devtools-extension

It is highly recommended that you use your browser's developer tools (such as [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) or [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)). It is also highly recommended to install the React Developer Tools extension: https://github.com/facebook/react-devtools

Source maps are also generated, making debugging compiled code manageable. Just make sure that source map support is enabled in your browser developer tool.

### package.json Scripts
#### Setup
* `setup`: Install dependencies and Flow library interface definitions

#### Building
* `build`: Run webpack and create a production build
* `build:debug`: Run webpack and debug the production configuration
* `build:stats`: Run webpack, create a production build, and generate `stats.production.json`
* `build:dev`: Run webpack and create a development build
* `build:dev:debug`: Run webpack and debug the development configuration
* `build:dev:stats`: Run webpack, create a development build, and generate `stats.development.json`

#### Running the Application
* `start`: Run production build
* `start:dev`: Run development build
* `start:dev:watch`: Run development build with hot loading for app code updates and auto-reload for config updates

#### Type Checking
* `flow`: Run Flow
* `flow-typed`: Run flow-typed

#### Linting
* `lint:js` & `lint`: Run ESLint
* `lint:styles`: Run stylelint

#### Testing
* `test`: Run Jest
* `test:coverage`: Generate test coverage info
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

### Editor Setup
To setup the project with Sublime Text, [read the "Sublime Text" documentation](../tools/sublime_text.md). More docs for setup with other editors are being considered.