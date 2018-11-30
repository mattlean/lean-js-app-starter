# Web Browser: Developing
## File Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* [`config`](../../config): webpack configuration
* [`src`](../../src): Application source code
  * [`__mocks__`](../../src/__mocks__): Mock test files
  * [`actions`](../../src/actions): Redux actions
  * [`assets`](../../src/assets): Images, fonts & other assets
  * [`components`](../../src/components): React presentational components
  * [`containers`](../../src/containers): Redux connected React components
  * [`reducers`](../../src/reducers): Redux reducers
  * [`types`](../../src/types): Flow type definitions
  * [`util`](../../src/util): Miscellaneous scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Development Server
To run the development server, run the [`package.json`](../../package.json) script `start:dev:watch`. This will start [webpack-dev-server](https://github.com/webpack/webpack-dev-server) which will automatically create a development build and host it at [localhost:8080](http://localhost:8080). Any changes you do to the codebase will automatically update the application. Any errors that occur will show up in the terminal where you are running the [`package.json`](../../package.json) script as well as the browser.

### Debugging
Redux DevTools is already setup for you in the codebase, all you need to do is install the extension for your browser: https://github.com/zalmoxisus/redux-devtools-extension

It is also highly recommend you use your browser's developer tools (such as [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools) or [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools)) and also install the React Developer Tools extension: https://github.com/facebook/react-devtools

### Linting
#### Scripts
You can use the following [`package.json`](../../package.json) scripts to lint your code:

* `lint:js` or `lint`: Lint JavaScript with [ESLint](https://eslint.org)
* `lint:styles`: Lint CSS and Sass with [stylelint](https://stylelint.io)

Instead of only using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint JavaScript with ESLint and styles with stylelint.

#### Sublime Text
*TODO...*

#### Configuration
If you want to configure the linters, you can edit the following files:

* [`.eslintrc.json`](../../.eslintrc.json): ESLint configuration for JavaScript
* [`.stylelintrc`](../../.stylelintrc): stylelint configuration for CSS and Sass

### Type Checking
You can run the [`package.json`](../../package.json) script `flow` to run [Flow](https://flow.org) to type check your code.

Instead of only using this script, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with Flow.

#### Sublime Text
*TODO...*

#### Configuration
If you want to configure Flow, you can edit [`.flowconfig`](../../.flowconfig).

### Testing
#### Running Tests
Use the following [`package.json`](../../package.json) scripts to have [Jest](https://jestjs.io) run your tests:

* `test`: Run all tests
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

#### Creating Tests
When you create tests, it is recommended that you end your file names with `.test.js` (or `.test.jsx` if it uses JSX) and put them in a `__tests__` folder.

#### Code Coverage
Run [Istanbul](https://istanbul.js.org) to collect coverage information with `test:coverage`. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).