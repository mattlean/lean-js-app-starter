# Node.js + Server-Side Rendering: Developing
## Folder Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* [`config`](../../../../config): webpack environment configuration
  * [`back`](../../../../config/back): webpack configuration for backend
  * [`common`](../../../../config/common): General webpack configuration code
  * [`front`](../../../../config/front): webpack configuration for frontend
* [`src`](../../../../src): Application source code
  * [`__mocks__`](../../../../src/__mocks__): Mock test files
  * [`back`](../../../../src/back): Source code for backend
    * [`config`](../../../../src/back/config): Application configuration
    * [`models`](../../../../src/back/assets): Database models
    * [`routes`](../../../../src/back/routes): Routes
    * [`util`](../../../../src/back/util): Utility scripts
  * [`front`](../../../../src/front): Source code for frontend
    * [`actions`](../../../../src/actions): Redux actions
    * [`assets`](../../../../src/assets): Images, fonts & other assets
    * [`components`](../../../../src/components): React presentational components
    * [`containers`](../../../../src/containers): Redux connected React components
    * [`reducers`](../../../../src/reducers): Redux reducers
    * [`types`](../../../../src/types): Flow type definitions
    * [`util`](../../../../src/util): Utility scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Backend
#### Application Development Mode
First start MongoDB by running the command `mongod` in a terminal window. 

Now there are two ways of running the app:

* `back:ssr:start:dev:watch`: Run the app with server-side rendering enabled
* `back:api:start:dev:watch`: Run the app API only

 Choose how you would like to run the app and then in another terminal window, run the corresponding [`package.json`](../../../../package.json) script. This will create a development build and run it at [localhost:9001](http://localhost:9001) while connecting to MongoDB at `mongodb://localhost/nodejs-ssr`. Any changes you do to the codebase will automatically rebuild and rerun the app.

[Postman](https://getpostman.com) is recommended for interfacing with the app's REST API. Details on how to import a collection and environment for this can be found in the ["Postman" documentation](../../../tools/postman.md).

If you want to utilize hot loading for frontend development, load the frontend single-page application with webpack-dev-server using the `front:start:dev:watch` [`package.json`](../../../../package.json) script while the backend is running.

#### Type Checking
Run the `flow` [`package.json`](../../../../package.json) script to run [Flow](https://flow.org) to type check your code. It will then type check all `.js`, `.jsx`, `.mjs`, and `.json` files that have the following comment at the top their code:
```javascript
// @flow
```

Running the `flow` script will start the Flow background process. If you need to end this process, run the `flow stop` script.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure Flow, you can edit [`.flowconfig`](../../../../.flowconfig). For more information on the config, read the ["Configuration: Flow" documentation](configuration.md#flow).

#### Linting
Run the `back:lint:js` or `back:lint` [`package.json`](../../../../package.json) scripts to run [ESLint](https://eslint.org) to lint your JavaScript.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint with ESLint and stylelint. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure ESLint, you can edit [`.eslintrc.json`](../../../../.eslintrc.json). For more information on the ESLint config, read the ["Configuration: ESLint" documentation](configuration.md#eslint).

#### Testing
##### Creating Tests
When creating tests, it is recommended that you end your file names with `.test.js` and put them in a `__tests__` folder.

If you are snapshot testing, you can use or [Enzyme](https://airbnb.io/enzyme) or [React test renderer](https://reactjs.org/docs/test-renderer.html).

##### Running Tests
Use the following [`package.json`](../../../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `back:test`: Run all tests
* `back:test:update`: Re-record snapshots
* `back:test:watch`: Watch files for changes and rerun the tests affected by these changes

Any test utilizing the database will connect to MongoDB at `mongodb://localhost/nodejs-ssr-test`.

If you want to configure Jest, you can edit [`jest.config.js`](../../../../jest.config.js). For more information on the config, read the ["Configuration: Jest" documentation](configuration.md#jest).

##### Code Coverage
Use the `back:test:coverage` [`package.json`](../../../../package.json) script to run [Istanbul](https://istanbul.js.org) to collect coverage information. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).

#### Debugging
Run the `back:ssr:start:dev:watch:debug` or `back:api:start:dev:watch:debug` [`package.json`](../../../../package.json) script to enable the inspector agent. The debugger will automatically put a breakpoint on first line of executed code.

Now you have multiple options on what inspector client you want to use. If you want to use [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools), go through the following steps:

1. Open [Google Chrome](https://google.com/chrome) and go to `about:inspect`
2. Click on "Open dedicated DevTools for Node"
3. A new Chrome DevTools window specifically for the application will pop-up

More info on Node.js debugging and other options for inspector clients can be found in the [Node.js "Debugging Guide"](https://nodejs.org/en/docs/guides/debugging-getting-started).

Source maps are also generated, making debugging compiled code manageable. Just make sure that source map support is enabled in your browser developer tool.

#### package.json Scripts
##### Setup
* `setup`: Install dependencies and Flow library interface definitions

##### Building
* `back:build`: Run webpack and create a production build
* `back:build:debug`: Run webpack and debug the production configuration
* `back:build:stats`: Run webpack, create a production build, and generate `stats.back.production.json`
* `back:build:dev`: Run webpack and create a development build
* `back:build:dev:debug`: Run webpack and debug the development configuration
* `back:build:dev:stats`: Run webpack, create a development build, and generate `stats.back.development.json`

##### Running the Application
* `back:ssr:start`: Run the server-side rendering production build
* `back:ssr:start:debug`: Debug the server-side rendering  production build
* `back:ssr:start:dev`: Run the server-side rendering  development build
* `back:ssr:start:dev:debug`: Debug the server-side rendering  development build
* `back:ssr:start:dev:watch`: Run the server-side rendering  development build with auto-reloading
* `back:ssr:start:dev:watch:debug`: Debug the server-side rendering development build with auto-reloading
* `back:api:start:dev:watch`: Run the API only development build with auto-reloading
* `back:api:start:dev:watch`: Run the API only development build with auto-reloading

##### Type Checking
* `flow`: Run Flow
* `flow-typed`: Run flow-typed

##### Linting
* `lint:js` & `lint`: Run ESLint
* `back:lint:js` & `back:lint`: Run ESLint on backend
* `back:lint:styles`: Run stylelint on backend
* `front:lint:js` & `front:lint`: Run ESLint on frontend
* `front:lint:styles`: Run stylelint on frontend

##### Testing
* `test`: Run Jest
* `test:coverage`: Generate test coverage info
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes
* `back:test`: Run Jest on backend
* `back:test:coverage`: Generate test coverage info on backend
* `back:test:update`: Re-record snapshots on backend
* `back:test:watch`: Watch files for changes and rerun the tests affected by these changes on backend
* `front:test`: Run Jest on frontend
* `front:test:coverage`: Generate test coverage info on frontend
* `front:test:update`: Re-record snapshots on frontend
* `front:test:watch`: Watch files for changes and rerun the tests affected by these changes on frontend

### Frontend
#### Development Server
To run the development server, run the `front:start:dev:watch` [`package.json`](../../../../package.json) script. This will start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) which will automatically create a development build and host it at [localhost:8080](http://localhost:8080). Any changes you do to the codebase will automatically update the app. Any errors that occur will show up in the terminal where you are running the script as well as the browser.

#### Creating JavaScript Files
When creating JavaScript files, if it includes any JSX at all, it is recommended that you end the filename with `.jsx`, otherwise end it with `.js`. This is to make it easier to distinguish when files use JSX or not.

#### Root Container
In the entry of the app source ([`main.jsx`](../../../../src/main.jsx)) you will find the [`Root` container](../../../../src/containers/Root.jsx) being rendered. This is the app's top-level container, so all other components/containers should be built under it.

By default the [`Root` container](../../../../src/containers/Root.jsx) handles Redux setup and routing, but you are free to change its behavior to handle whatever you need. The only caveat is that you need to ensure this [`Root` container](../../../../src/containers/Root.jsx) always remains the top-level container as it is setup to hot reload itself and its children.

#### Redux Store
The app source comes with one utility script called [`store.js`](../../../../src/util/store.js) which exports a function called `createStore`. You can see it already being used in [`main.jsx`](../../../../src/main.jsx).

##### Arguments
1. `reducer` *(Function)*: A Redux reducer that is required. Likely the root reducer that combines all of the reducers for your app.
2. `preloadedState` *(any)*: An optional initial state for the store. If `null` or `undefined` is passed, it will be ignored.
3. `middlewares` *(Array)*: An optional array of Redux middlewares. If `null` or `undefined` is passed, it will be ignored.
4. `devMiddlewares` *(Array)*: An optional array of Redux middlewares only to be included when the store is running in a development environment.

##### Returns
*(Store)*: A Redux store that is compatible with Redux DevTools.

#### Type Checking
Run the `flow` [`package.json`](../../../../package.json) script to run [Flow](https://flow.org) to type check your code. It will then type check all `.js`, `.jsx`, `.mjs`, and `.json` files that have the following comment at the top their code:
```javascript
// @flow
```

Running the `flow` script will start the Flow background process. If you need to end this process, run the `flow stop` script.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure Flow, you can edit [`.flowconfig`](../../../../.flowconfig). For more information on the config, read the ["Configuration: Flow" documentation](configuration.md#flow).

#### Linting
You can use the following [`package.json`](../../../../package.json) scripts to lint your code:

* `lint:js` or `lint`: Lint JavaScript with [ESLint](https://eslint.org)
* `lint:styles`: Lint CSS and Sass with [stylelint](https://stylelint.io)

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint with ESLint and stylelint. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure the linters, you can edit the following files:

* [`.eslintrc.json`](../../../../.eslintrc.json): ESLint configuration
* [`.stylelintrc`](../../../../.stylelintrc): stylelint configuration

For more information on the ESLint config, read the ["Configuration: ESLint" documentation](configuration.md#eslint). For more information on the stylelint config, read the ["Configuration: stylelint" documentation](configuration.md#stylelint).

#### Testing
##### Creating Tests
When creating tests, it is recommended that you end your file names with `.test.js` (or `.test.jsx` if it uses JSX) and put them in a `__tests__` folder.

If you are snapshot testing, you can use or [Enzyme](https://airbnb.io/enzyme) or [React test renderer](https://reactjs.org/docs/test-renderer.html).

##### Running Tests
Use the following [`package.json`](../../../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `front:test`: Run all tests
* `front:test:update`: Re-record snapshots
* `front:test:watch`: Watch files for changes and rerun the tests affected by these changes

If you want to configure Jest, you can edit [`jest.config.js`](../../../../jest.config.js). For more information on the config, read the ["Configuration: Jest" documentation](configuration.md#jest).

##### Code Coverage
Use the `front:test:coverage` [`package.json`](../../../../package.json) script to run [Istanbul](https://istanbul.js.org) to collect coverage information. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).

#### Debugging
Redux DevTools is already setup for you in the codebase, all you need to do is install the extension for your browser: https://github.com/zalmoxisus/redux-devtools-extension

It is highly recommended that you use your browser's developer tools (such as [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) or [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)). It is also highly recommended to install the React Developer Tools extension: https://github.com/facebook/react-devtools

Source maps are also generated, making debugging compiled code manageable. Just make sure that source map support is enabled in your browser developer tool.

#### package.json Scripts
##### Setup
* `setup`: Install dependencies and Flow library interface definitions

##### Building
* `front:build`: Run webpack and create a production build
* `front:build:debug`: Run webpack and debug the production configuration
* `front:build:stats`: Run webpack, create a production build, and generate `stats.front.production.json`
* `front:build:dev`: Run webpack and create a development build
* `front:build:dev:debug`: Run webpack and debug the development configuration
* `front:build:dev:stats`: Run webpack, create a development build, and generate `stats.front.development.json`

##### Running the Application
* `front:start`: Run production build
* `front:start:dev`: Run development build
* `front:start:dev:watch`: Run development build with hot loading for app code updates and auto-reload for config updates

##### Type Checking
* `flow`: Run Flow
* `flow-typed`: Run flow-typed

##### Linting
* `lint:js` & `lint`: Run ESLint
* `lint:styles`: Run stylelint

##### Testing
* `test src/front`:  Run all frontend tests
* `test:coverage`: Generate test coverage info
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

### Editor Setup
To setup the project with Sublime Text, [read the "Sublime Text" documentation](../../../tools/sublime_text.md). More docs for setup with other editors are being considered.