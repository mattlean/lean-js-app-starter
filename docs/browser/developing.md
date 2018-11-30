# Web Browser: Developing
## File Structure
* `build`: webpack builds output here. Not versioned.
  * `development`: Development builds generated here
  * `production`: Production builds generated here
* `config`: webpack configuration
* `src`: Application source code
  * `__mocks__`: Mock test files
  * `actions`: Redux actions
  * `assets`: Images, fonts & other assets
  * `components`: React presentational components
  * `containers`: Redux connected React components
  * `reducers`: Redux reducers
  * `types`: Flow type definitions
  * `util`: Miscellaneous scripts

*Jest tests are found throughout several parts of the project within `__tests__` folders.*

## Development Process
### Debugging
Redux DevTools is already setup for you in the codebase, all you need to do is install the extension for your browser: https://github.com/zalmoxisus/redux-devtools-extension

It is also highly recommend you use your browser's developer tools and also install the React Developer Tools extension: https://github.com/facebook/react-devtools

### Linting
#### Scripts
You can use the following `package.json` scripts to lint your code:

* `lint`: Lint JavaScript with ESLint
* `lint:styles`: Lint CSS and Sass with stylelint

Instead of using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to lint JavaScript with [ESLint](https://eslint.org) and styles with [stylelint](https://stylelint.io).

#### Sublime Text
*TODO...*

#### Configuration
If you want to configure the linters, you can edit the following files:

* `.eslintrc.json`: ESLint configuration for JavaScript
* `.stylelintrc`: stylelint configuration for CSS and Sass

### Type Checking
You can use the following `package.json` scripts to type check your code:

* `flow`: Run Flow
* `flow-typed`: Run flow-typed

Instead of using these scripts, it is highly recommended that you enable plugins/extensions in your code editor to allow it to type check with [Flow](https://flow.org).

#### Sublime Text
*TODO...*

#### Configuration
If you want to configure Flow, you can edit `.flowconfig`.

### Testing
#### Creating Tests
When you create tests, it is recommended that you end your file names with `.test.js` (or `.test.jsx` if it uses JSX) and put them in a `__tests__` folder.

#### Running Tests
Use the following `package.json` scripts to have [Jest](https://jestjs.io) run your tests:

* `test`: Run all tests
* `test:update`: Re-record snapshots
* `test:watch`: Watch files for changes and rerun the tests affected by these changes

#### Code Coverage
Run [Istanbul](https://istanbul.js.org) to collect coverage information with `test:coverage`. Doing so will output the results in the terminal as well as generate `coverage/` (which is not versioned).