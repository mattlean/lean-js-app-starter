# React + Electron Starter (TypeScript)

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for a [React](https://react.dev) application written in [TypeScript](https://typescriptlang.org) targeted for macOS, Windows, and Linux.

_If you don't need TypeScript, then use the [React + Electron starter](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/starters/react-electron) instead._

## Technology Overview

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [Electron](https://electronjs.org): Framework for building desktop apps through [Node.js](https://nodejs.org) & [Chromium](https://chromium.org/chromium-projects)
-   [React](https://react.dev): Library for user interfaces
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Unit testing library specialized for React components
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

There are two different methods you can use to get started:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Manual Installation](#method-2-manual-installation)

### Method 1: Initialization Script (Recommended)

This method is the simplest.

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

#### Step 1. Run the initialization script

Open a terminal and run the init script in the project root directory which will execute all the setup commands like `npm install` for you:

```console
bash init.sh
```

_[Learn exactly what the init script is doing in method 2.](#method-2-manual-installation)_

#### Step 2. Start the development build

Start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

---

### Method 2: Manual Installation

This method manually does what the init script does for you.

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

#### Step 1. Install npm dependencies & devDependencies

First, open a terminal, navigate to your project's root directory, and install npm dependencies with the following command:

```console
npm install
```

_Learn more about [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) in the npm Docs._

#### Step 2. Create a `.env` file

Copy the `.env.example` file and paste it as `.env`. This can be done with this command:

```console
cp .env.example .env
```

_Learn more about how this project handles environment variable files with the [`dotenv` package from its `README.md`](https://github.com/motdotla/dotenv)._

#### Step 3. Create a development build

Create a dev build with webpack using this command:

```console
npm run build
```

For more information on the build process, please read the ["Building" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0-dev/docs/building.md).

#### Step 4. Start the development build

Finally, start the dev build with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter** and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/docs)
