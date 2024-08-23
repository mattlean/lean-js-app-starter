# React Browser Starter (TypeScript)

## `react-browser-ts`

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for a [React](https://react.dev) application written in [TypeScript](https://typescriptlang.org) targeted for web browsers.

_If you don't need TypeScript, then use the [`react-browser` starter](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/react-browser) instead._

## Technology Overview

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [React](https://react.dev): Library for user interfaces
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework used mainly for unit testing
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Unit testing library specialized for React components
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [Playwright](https://playwright.dev): End-to-end (E2E) testing
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and output cross-browser compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in TypeScript & JavaScript
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment

## Getting Started

There are three different methods you can use to get started:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Docker Development Environment (Recommended)](#method-2-docker-development-environment-recommended)
3. [Manual Installation](#method-3-manual-installation)

---

### Method 1: Initialization Script (Recommended)

This method is the simplest if you are not using the Docker dev environment (method B).

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

#### Step 1. Run the initialization script

Open a terminal and run the init script in the project root directory which will execute all the setup commands like `npm install` for you:

```console
bash init.sh
```

_[Learn exactly what the init script is doing in method 3.](#method-3-manual-installation)_

#### Step 2. Start the development server

Start the dev server with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

---

### Method 2: Docker Development Environment (Recommended)

This method is the simplest as it only only requires Docker. Also, you won't need to worry about which Node.js version your machine is running because the dev environment will use a separate Node.js process running inside the container.

TODO: link to docker dev env doc

#### Prerequisites

The only requirement is [Docker](https://docker.com/get-started).

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### Step 1. Create a `.env` file

This can be done with the init script in the project root directory:

```console
bash init.sh --skip-npm-install --skip-playwright
```

#### Step 2. Start the Docker development environment

Start the Docker dev environment by running the following command in a project directory:

```console
docker compose up
```

TODO: maybe move the following somewhere else

This command may take a while the first time you run it since it will need to create a new Docker image, download npm dependencies, etc. However, subsequent runs of this command will be much faster since it can reuse cached layers under most circumstances, or in the best case scenario, reuse a completely cached image.

Although the development server is running within the container, it will still be able to watch for changes you make to the code on your host machine. That means the development server will still be able to reflect changes in the app as you write code and will operate similarly to if you were running the development server natively like in methods 1 or 3.

When you're done working, you can press Ctrl+C in the terminal running the Docker dev environment to shut it down.

---

### Method 3: Manual Installation

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

#### (Optional) Setup Playwright

If you intend to perform end-to-end testing, setup Playwright with this command:

```console
npm run test:e2e:install
```

#### Step 3. Start the development server

Finally, start the dev server with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter** and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/master/docs)
