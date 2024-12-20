# Testing

## Contents

- [Jest](#jest)
  - [Creating Jest Test Files](#creating-jest-test-files)
  - [Running Jest Tests](#running-jest-tests)
  - [Coverage with Jest](#coverage-with-jest)
  - [Debugging Jest Tests](#debugging-jest-tests)
  - [Configuring Jest](#configuring-jest)
  - [Jest Learning Resources](#jest-learning-resources)
- [Playwright](#playwright)
  - [Creating Playwright Test Files](#creating-playwright-test-files)
  - [Running Playwright Tests](#running-playwright-tests)
  - [Debugging Playwright Tests](#debugging-playwright-tests)
  - [Configuring Playwright](#configuring-playwright)
  - [Playwright Learning Resources](#playwright-learning-resources)

## Jest

[Jest](https://jestjs.io) is setup for all projects.

### Creating Jest Test Files

LJAS uses the default Jest behavior which only has two patterns that you will need to follow if you want Jest to be able to find your tests without changing the [`testMatch` option](https://jestjs.io/docs/configuration#testmatch-arraystring) in the Jest config file.

The first one is that it will match all JavaScript and TypeScript files with `.spec` or `.test` before its file extension. For example, the following file names would be matched:

- `foo.test.js`
- `bar.spec.jsx`
- `baz.test.ts`
- `xyzzy.spec.tsx`

The second one is that it will match all JavaScript and TypeScript files within a `__tests__` directory, even if its file name does not have `.spec` or `.test` before its file extension. For example, the following files would be matched:

- `__tests__/foo.js`
- `bar/__tests__/baz.jsx`
- `__tests__/xyzzy.test.ts`
- `foo/bar/__tests__/plugh.spec.tsx`

### Running Jest Tests

Run the `test` `package.json` script to run Jest:

```console
npm test
```

You can also use its shorthand version: `npm t`.

`npm test` is just an alias for the `jest` command, so you can also pass in any of its [CLI options](https://jestjs.io/docs/cli) like so:

```console
npm test src -- -t snapshot
```

You can also run Jest in [watch mode](https://jestjs.io/docs/cli#--watch) with the `test:watch` `package.json` script:

```console
npm run test:watch
```

### Coverage with Jest

Run the `test:coverage` `package.json` script to have Jest generate coverage with [Istanbul](https://istanbul.js.org):

```console
npm run test:coverage
```

This will output an HTML coverage report in the `coverage/` directory. You can open this with the following command:

```console
npm run test:coverage:open
```

### Debugging Jest Tests

To learn how to debug Jest Tests, refer to the ["Jest tests with Visual Studio Code" section in the "Debugging" document](./debugging.md#jest-tests-with-visual-studio-code).

### Configuring Jest

Read the [Jest configuration document](../configuration/jest.md) to learn how it is configured and how to customize it yourself.

### Jest Learning Resources

- [Jest Docs: Getting Started](https://jestjs.io/docs/getting-started)  
  Learn the basics of writing and running Jest tests.
- [React Testing Library (RTL) Tutorial](https://robinwieruch.de/react-testing-library)  
   Learn [RTL](https://testing-library.com/docs/react-testing-library/intro) in a tutorial written by Robin Wieruch. This tutorial is recommended by the [Testing Library docs](https://testing-library.com/docs/react-testing-library/intro#tutorials).
- [Mock Service Worker (MSW) Docs: Getting started](https://mswjs.io/docs/getting-started)  
   Learn how to use MSW by following their getting started document.

## Playwright

[Playwright](https://playwright.dev) is only setup for frontend-related projects:

| Starter Project Name                  | JavaScript                                                                                                     | TypeScript                                                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Basic Browser                         | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-browser)              | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-browser-ts)              |
| Basic Electron                        | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-electron)             | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-electron-ts)             |
| React + Browser                       | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-browser)              | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-browser-ts)              |
| React + Electron                      | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-electron)             | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-electron-ts)             |
| React + Express + MongoDB with SSR    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-mongo-ssr)    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-postgres-ssr) | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-postgres-ssr-ts) |

### Creating Playwright Test Files

Playwright will look for all JavaScript and TypeScript files including `.spec` or `.test` before its file extension in the `src/playwright/` directory. For example, the following files would be matched:

- `src/playwright/foo.test.js`
- `src/playwright/bar.spec.ts`
- `src/playwright/baz/xyzzy.spec.jsx`
- `src/playwright/foo/bar/plugh.spec.tsx`

### Running Playwright Tests

Run the `test:e2e` `package.json` script to run Playwright:

```console
npm run test:e2e
```

`npm run test:e2e` is just an alias for the `playwright test` command, so you can also pass in any of its [CLI options](https://playwright.dev/docs/test-cli) like so:

```console
npm run test:e2e src/playwright -- --project=chromium
```

You can also run Playwright in [UI mode](https://playwright.dev/docs/test-ui-mode) with the `test:e2e:dev` `package.json` script:

```console
npm run test:e2e:dev
```

If a test fails, Playwright will serve an HTML report of the results at [`http://localhost:9323`](http://localhost:9323). If you ever want to access this after it has closed, you can use the `test:e2e:report` `package.json` script to serve it again:

```console
npm run test:e2e:report
```

Some prefer running a separate dev server specifically for E2E tests, so we offer a `loadApp` function in `src/playwright/util.js` (or `util.ts` if your project is TypeScript-based) that allows your Playwright tests to switch between the regular dev server host (which by default is http://localhost:8080 or http://localhost:3000 depending on the situation) or the E2E dev server host (which by default is http://localhost:8180 or http://localhost:3100 depending on the situation).

To switch to the E2E dev server host, set the `E2E` environment variable in the `.env` file to `true`. Then the next time you run Playwright tests through a `test:e2e` script, it will run tests against the E2E dev server host. If you want to switch back to testing against the regular dev server host, set `.env` to `false` or an empty value.

### Debugging Playwright Tests

Please refer to the ["Playwright Tests with Visual Studio Code" section](./debugging.md#playwright-tests-with-visual-studio-code) or the ["Playwright Tests with Playwright Inspector" section](./debugging.md#playwright-tests-with-playwright-inspector) in the "Debugging" document.

### Docker End-to-End Test Environment

If you're working off of a project that supports Playwright and does not utilize Electron, you will have access to a Docker test environment specialized for working with Playwright tests.

To learn how to use it, read the ["Setting Up the Docker End-to-End Test Environment" section in the "Docker Environments" document](../developing/docker-environments.md#setting-up-the-docker-end-to-end-test-environment).

### Configuring Playwright

Read the [Playwright configuration document](../configuration/playwright.md) to learn how it is configured and how to customize it yourself.

### Playwright Learning Resources

- [Playwright Docs: Getting Started](https://playwright.dev/docs/intro)  
  Learn how to use and write tests with Playwright by following their getting started document.
