# React Browser Starter (TypeScript)

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for a [React](https://react.dev) application targeted for web browsers.

_Note that this uses TypeScript. If you want the JavaScript equivalent to this, use the [`react-browser` starter](../react-browser) instead._

## Technology Overview

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [React](https://react.dev): Library for user interfaces
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework mainly for unit testing
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Unit testing library specialized for React components
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [Playwright](https://playwright.dev): End-to-end testing
-   [ESLint](https://eslint.org): Linter used to identify problems in TypeScript and JavaScript code
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS code
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [webpack](https://webpack.js.org): Bundler used to create builds of the app
-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and React while producing cross-browser compatible code for the build
-   [Husky](https://typicode.github.io/husky) & [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits
-   [Docker](https://docker.com): Used for an optional development environment

## Getting Started

There are three different methods you can use to get started:

### A) Initialization Script (Recommended)

#### 0. Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

Next, run the `init.sh` script in the project root directory. This will setup your `.env` file, install npm dependencies, and setup Playwright:

```console
bash init.sh
```

Finally, start the development server with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the development server to shut it down.

### 2. Docker Development Environment

Alternatively, you can run the Docker development environment which only requires an installation of [Docker](https://www.docker.com/get-started). This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

First you need to generate a `.env` file which can be done with the `init.sh` script like so:

```console
bash init.sh --skip-e2e --skip-npm-install
```

Then all you need to do is run the following command in the project directory and Docker will handle the rest for you:

```console
docker compose up
```

This command may take a while the first time you run it since it will need to create a new Docker image, download npm dependencies, etc. However, subsequent runs of this command will be much faster since it can reuse cached layers under most circumstances, or in the best case scenario, reuse a completely cached image.

Although the development server is running within the container, it will still be able to watch for changes you make to the code on your host machine. That means the development server will still be able to reflect changes in the app as you write code and will operate similarly to if you were running the development server natively like in methods 1 or 3.

When you're done working, you can press Ctrl+C in the terminal running the container to shut it down.

### 3. Manual Installation

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed. This was tested on Node.js v18.16.0, but many other versions should still work.

First install npm dependencies with the following command:

```console
npm install
```

Next, copy the `.env.example` file and paste it as `.env`. This can be done with this command:

```console
cp .env.example .env
```

Optionally, if you're going to use Playwright, you can set it up with this command:

```console
npm run test:e2e:install
```

Finally, start the development server with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the development server to shut it down.

## Learn More With the Documentation

[Read the docs to learn more about what else you can do with Lean JS App Starter and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/master/docs)
