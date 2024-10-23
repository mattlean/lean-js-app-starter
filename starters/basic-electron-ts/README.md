# Basic Electron Starter (TypeScript)

This is a [**Lean JS App Starter (LJAS)**](https://github.com/mattlean/lean-js-app-starter) starter project for a [TypeScript](https://typescriptlang.org) application targeted for macOS, Windows, and Linux.

_If you don't need TypeScript, then use the [Basic Electron starter](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/basic-electron) instead._

## Technology Overview

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [Electron](https://electronjs.org): Framework for building desktop apps through [Node.js](https://nodejs.org) & [Chromium](https://chromium.org)
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework
-   [DOM Testing Library](https://testing-library.com/docs/dom-testing-library/intro): Unit testing library for DOM nodes
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [Playwright](https://playwright.dev): End-to-end (E2E) testing
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and output Electron-compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in TypeScript & JavaScript
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits are made
-   [npm](https://npmjs.com): Package manager

## Getting Started

First, [**download the starter project's ZIP file**](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0/ljas-basic-electron-ts_1-0-0.zip) and extract it.

Then, choose one of the following methods:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Manual Installation](#method-2-manual-installation)

---

### Method 1: Initialization Script (Recommended)

This method is the simplest.

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v20.9.0, but any version from >=20.9 to <21 will work.

#### Step 1. Run the initialization script

Open a terminal and run the init script in the project's root directory. This will perform all of the setup for you like creating a `.env` file and installing npm dependencies:

```console
bash init.sh --install-playwright
```

[_Note: Learn exactly what the init script is doing in method 2._](#method-2-manual-installation)

#### Step 2. Start the development build

Start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

---

### Method 2: Manual Installation

This method manually does what the init script does for you normally.

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v20.9.0, but any version from >=20.9 to <21 will work.

#### Step 1. Install npm dependencies

First, open a terminal, navigate to your project's root directory, and install npm dependencies with the following command:

```console
npm ci
```

[_Note: Learn more about `npm ci` in the npm Docs._](https://docs.npmjs.com/cli/v10/commands/npm-ci)

#### Step 2. Create a `.env` file

Copy the `.env.example` file and paste it as the `.env` file. This can be done with this command in the project's root directory:

```console
cp .env.example .env
```

[_Note: Learn more about the `.env` file in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/configuration/dotenv-file.md)

#### Step 3. Create a development build

Create a dev build with webpack using this `package.json` script:

```console
npm run build
```

[_Note: Learn more about the build process in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/building.md)

#### (Optional) Setup Playwright

If you intend to perform end-to-end testing, setup Playwright with this command:

```console
npm run test:e2e:install
```

#### Step 4. Start the development build

Finally, start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

[_Note: Learn more about the `dev` `package.json` script in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/developing/javascript-typescript.md#auto--hot-reloading)

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter**.](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/docs)
