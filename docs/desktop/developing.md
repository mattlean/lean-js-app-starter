# Desktop: Developing
## Folder Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* [`config`](../../config): webpack environment configuration
* [`src`](../../src): Application source code
  * [`__mocks__`](../../src/__mocks__): Mock test files
  * [`main`](../../src/main): Source code for main process
  * [`renderer`](../../src/renderer): Source code for renderer process
    * [`actions`](../../src/renderer/actions): Redux actions
    * [`assets`](../../src/renderer/assets): Images, fonts & other assets
    * [`components`](../../src/renderer/components): React presentational components
    * [`containers`](../../src/renderer/containers): Redux connected React components
    * [`reducers`](../../src/renderer/reducers): Redux reducers
    * [`types`](../../src/renderer/types): Flow type definitions
    * [`util`](../../src/renderer/util): Utility scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Application Development Mode
There are two steps to running the app in development mode.

First the renderer process must be started through the development server. In one terminal window, run the `rend:start:dev:watch` [`package.json`](../../package.json) script. This will start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) which will automatically create a development build and host it at [localhost:8080](http://localhost:8080).

After that the main process must be started to open the Electron app. In another terminal window, run the `main:start:dev:watch` [`package.json`](../../package.json) script.

Any changes you do to the codebase will automatically update the app. Any errors that occur will show up in their respective terminals where you are running the scripts.

### Creating JavaScript Files
When creating JavaScript files, if it includes any JSX at all, it is recommended that you end the filename with `.jsx`, otherwise end it with `.js`. This is to make it easier to distinguish when files use JSX or not.

### Root Container
In the entry of the renderer source ([`main.jsx`](../../src/renderer/main.jsx)) you will find the [`Root` container](../../src/renderer/containers/Root.jsx) being rendered. This is the app's top-level container, so all other components/containers should be built under it.

By default the [`Root` container](../../src/renderer/containers/Root.jsx) handles Redux setup and routing, but you are free to change its behavior to handle whatever you need. The only caveat is that you need to ensure this [`Root` container](../../src/renderer/containers/Root.jsx) always remains the top-level container as it is setup to hot reload itself and its children.

### Redux Store
The renderer source comes with one utility script called [`store.js`](../../src/renderer/util/store.js) which exports a function called `createStore`. You can see it already being used in [`main.jsx`](../../src/renderer/main.jsx).

#### Arguments
1. `reducer` *(Function)*: A Redux reducer that is required. Likely the root reducer that combines all of the reducers for your app.
2. `preloadedState` *(any)*: An optional initial state for the store. If `null` or `undefined` is passed, it will be ignored.
3. `middlewares` *(Array)*: An optional array of Redux middlewares. If `null` or `undefined` is passed, it will be ignored.
4. `devMiddlewares` *(Array)*: An optional array of Redux middlewares only to be included when the store is running in a development environment.

#### Returns
*(Store)*: A Redux store that is compatible with Redux DevTools.

### Type Checking
Run the `flow` [`package.json`](../../package.json) script to run [Flow](https://flow.org) to type check your code. It will then type check all `.js`, `.jsx`, `.mjs`, and `.json` files that have the following comment at the top their code:
```javascript
// @flow
```

Running the `flow` script will start the Flow background process. If you need to end this process, run the `flow stop` script.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../tools/sublime_text.md).

If you want to configure Flow, you can edit [`.flowconfig`](../../.flowconfig). For more information on the config, read the ["Configuration: Flow" documentation](configuration.md#flow).

### Linting
You can use the following [`package.json`](../../package.json) scripts to lint your code:

* `lint:js` or `lint`: Lint JavaScript with [ESLint](https://eslint.org)
* `lint:styles`: Lint CSS and Sass with [stylelint](https://stylelint.io)

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint with ESLint and stylelint. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../tools/sublime_text.md).

If you want to configure the linters, you can edit the following files:

* [`.eslintrc.json`](../../.eslintrc.json): ESLint configuration
* [`.stylelintrc`](../../.stylelintrc): stylelint configuration

For more information on the ESLint config, read the ["Configuration: ESLint" documentation](configuration.md#eslint). For more information on the stylelint config, read the ["Configuration: stylelint" documentation](configuration.md#stylelint).

### Testing
#### Creating Tests
When creating tests, it is recommended that you end your file names with `.test.js` (or `.test.jsx` if it uses JSX) and put them in a `__tests__` folder.

If you are snapshot testing, you can use or [Enzyme](https://airbnb.io/enzyme) or [React test renderer](https://reactjs.org/docs/test-renderer.html).

#### Running Tests
Use the following [`package.json`](../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `test`: Run all tests
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

If you want to configure Jest, you can edit [`jest.config.js`](../../jest.config.js). For more information on the config, read the ["Configuration: Jest" documentation](configuration.md#jest).

#### Code Coverage
Use the `test:coverage` [`package.json`](../../package.json) script to run [Istanbul](https://istanbul.js.org) to collect coverage information. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).

### Debugging
Redux DevTools is already setup for you in the codebase, all you need to do is install the extension for your browser: https://github.com/zalmoxisus/redux-devtools-extension

It is highly recommended that you use your browser's developer tools (such as [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) or [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)). It is also highly recommended to install the React Developer Tools extension: https://github.com/facebook/react-devtools

Source maps are also generated, making debugging compiled code manageable. Just make sure that source map support is enabled in your browser developer tool.

### package.json Scripts
#### Setup
* `setup`: Install dependencies and Flow library interface definitions

#### Building
##### Both Processes
* `build`: Run webpack in production mode and create a renderer process build, then a main process build
* `build:debug`: Run webpack and debug the production configuration
* `build:stats`: Run webpack in production mode, create a renderer process build, then a main process build, and generate `stats.production.json`
* `build:dev`: Run webpack in development mode and create a renderer process build, then a main process build
* `build:dev:debug`: Run webpack and debug the development configuration
* `build:dev:stats`: Run webpack in production mode, create a renderer process build, then a main process build, and generate `stats.development.json`
* `dist`: Run webpack and create a production build, then run electron-builder and create an executable
* `dist:debug`: Run webpack and create a production build, then run electron-builder and create an executable while displaying more info about the build process
* `pack`: Run electron-builder and create an unpacked directory for testing purposes

##### Main Process
* `main:build`: Run webpack and create a main process production build
* `main:build:debug`: Run webpack and debug the main process production configuration
* `main:build:stats`: Run webpack, create a main process production build, and generate `stats.main.production.json`
* `main:build:dev`: Run webpack and create a main process development build
* `main:build:dev:debug`: Run webpack and debug the main process development configuration
* `main:build:dev:stats`: Run webpack, create a main process development build, and generate `stats.main.development.json`

##### Renderer Process
* `rend:build`: Run webpack and create a renderer process production build
* `rend:build:debug`: Run webpack and debug the renderer process production configuration
* `rend:build:stats`: Run webpack, create a renderer process production build, and generate `stats.rend.production.json`
* `rend:build:dev`: Run webpack and create a renderer process development build
* `rend:build:dev:debug`: Run webpack and debug the renderer process development configuration
* `rend:build:dev:stats`: Run webpack, create a renderer process development build, and generate `stats.rend.development.json`

#### Running the Application
##### Both Processes
* `main:start` & `start`: Run production build
* `main:start:debug` & `start:debug`: Debug production build

##### Main Process
* `main:start:dev` & `start:dev`: Run main process development build
* `main:start:dev:debug` & `start:dev:debug`: Debug main process development build
* `main:start:dev:watch` & `start:dev:watch`: Run main process development build with auto-reload
* `main:start:dev:watch:debug` & `start:dev:watch:debug`: Debug main process development build with auto-reload

##### Renderer Process
* `rend:start`: Preview renderer process production build
* `rend:start:dev`: Run development renderer process build
* `rend:start:dev:watch`: Run renderer process development build with hot loading for app code updates and auto-reload for config updates

#### Type Checking
* `flow`: Run Flow
* `flow-typed`: Run flow-typed

#### Linting
* `lint` & `lint:js`: Run ESLint
* `lint:styles`: Run stylelint

#### Testing
* `test`: Run Jest
* `test:coverage`: Generate test coverage info
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

### Editor Setup
To setup the project with Sublime Text, [read the "Sublime Text" documentation](../tools/sublime_text.md). More docs for setup with other editors are being considered.