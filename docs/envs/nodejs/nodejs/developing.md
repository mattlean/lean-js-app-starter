# Node.js: Developing
## Folder Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* [`config`](../../../../config): webpack environment configuration
* [`src`](../../../../src): Application source code
  * [`config`](../../../../src/config): Application configuration
  * [`models`](../../../../src/assets): Database models
  * [`routes`](../../../../src/routes): Routes
  * [`util`](../../../../src/util): Utility scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Application Development Mode
There are two steps to running the app in development mode.

First start MongoDB by running the command `mongod` in a terminal window. Then in another terminal window, run the `start:dev:watch` [`package.json`](../../../../package.json) script. This will create a development build and run it at [localhost:9001](http://localhost:9001) while connecting to MongoDB at `mongodb://localhost/nodejs`. Any changes you do to the codebase will automatically rebuild and rerun the app.

[Postman](https://getpostman.com) is recommended for interfacing with the app's REST API. Details on how to import a collection and environment for this can be found in the ["Postman" documentation](../../tools/postman.md).

### Type Checking
Run the `flow` [`package.json`](../../../../package.json) script to run [Flow](https://flow.org) to type check your code. It will then type check all `.js`, `.jsx`, `.mjs`, and `.json` files that have the following comment at the top their code:
```javascript
// @flow
```

Running the `flow` script will start the Flow background process. If you need to end this process, run the `flow stop` script.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure Flow, you can edit [`.flowconfig`](../../../../.flowconfig). For more information on the config, read the ["Configuration: Flow" documentation](configuration.md#flow).

### Linting
Run the `lint:js` or `lint` [`package.json`](../../../../package.json) scripts to run [ESLint](https://eslint.org) to lint your JavaScript.

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint with ESLint and stylelint. Details on how to set this up for Sublime Text can be found in the ["Sublime Text" documentation](../../../tools/sublime_text.md).

If you want to configure ESLint, you can edit [`.eslintrc.json`](../../../../.eslintrc.json). For more information on the ESLint config, read the ["Configuration: ESLint" documentation](configuration.md#eslint).

### Testing
#### Creating Tests
When creating tests, it is recommended that you end your file names with `.test.js` and put them in a `__tests__` folder.

If you are snapshot testing, you can use or [Enzyme](https://airbnb.io/enzyme) or [React test renderer](https://reactjs.org/docs/test-renderer.html).

#### Running Tests
Use the following [`package.json`](../../../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `test`: Run all tests
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

Any test utilizing the database will connect to MongoDB at `mongodb://localhost/nodejs-test`.

If you want to configure Jest, you can edit [`jest.config.js`](../../../../jest.config.js). For more information on the config, read the ["Configuration: Jest" documentation](configuration.md#jest).

#### Code Coverage
Use the `test:coverage` [`package.json`](../../../../package.json) script to run [Istanbul](https://istanbul.js.org) to collect coverage information. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).

### Debugging
Run the `start:dev:watch:debug` [`package.json`](../../../../package.json) script to enable the inspector agent. The debugger will automatically put a breakpoint on first line of executed code.

Now you have multiple options on what inspector client you want to use. If you want to use [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools), go through the following steps:

1. Open [Google Chrome](https://google.com/chrome) and go to `about:inspect`
2. Click on "Open dedicated DevTools for Node"
3. A new Chrome DevTools window specifically for the application will pop-up

More info on Node.js debugging and other options for inspector clients can be found in the [Node.js "Debugging Guide"](https://nodejs.org/en/docs/guides/debugging-getting-started).

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
* `start:debug`: Debug production build
* `start:dev`: Run development build
* `start:dev:debug`: Debug development build
* `start:dev:watch`: Run development build with hot loading for app code updates and auto-reload for config updates
* `start:dev:watch:debug`: Debug development build with hot loading for app code updates and auto-reload for config updates

#### Type Checking
* `flow`: Run Flow
* `flow-typed`: Run flow-typed

#### Linting
* `lint:js` & `lint`: Run ESLint

#### Testing
* `test`: Run Jest
* `test:coverage`: Generate test coverage info
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

### Editor Setup
To setup the project with Sublime Text, [read the "Sublime Text" documentation](../../../tools/sublime_text.md). More docs for setup with other editors are being considered.