# Basic Node.js Starter (TypeScript)

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for a [Node.js](https://nodejs.org) application.

_Note that this starter project uses TypeScript. If you want the JavaScript-only equivalent to this, then use the [`basic-node` starter](../basic-node) instead._

## Technology Overview

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
-   [Jest](https://jestjs.io): Testing framework
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and output Node.js-compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in TypeScript and JavaScript code
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment

## Getting Started

There are three different methods you can use to get started:

### A) Initialization Script (Recommended)

This method is the simplest if you are not using the Docker dev environment (method B).

#### 0. Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

#### 1. Run the initialization script

Open a terminal and run the init script in the project root directory which will execute all the setup commands like `npm install` for you:

```console
bash init.sh
```

#### 2. Start the development build

Start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

---

### B) Docker Development Environment (Recommended)

This method is the simplest as it only only requires Docker and has one step. Also, you won't need to worry about which Node.js version your machine is running because the dev environment will use a separate Node.js process running inside the container.

TODO: link to docker dev env doc

#### 0. Prerequisites

The only requirement is [Docker](https://docker.com/get-started).

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### 1. Start the Docker dev environment

Run the following Docker command:

```console
docker compose up
```

TODO: maybe move the following somewhere else

This command may take a while the first time you run it since it will need to create a new Docker image, download npm dependencies, etc. However, subsequent runs of this command will be much faster since it can reuse cached layers under most circumstances, or in the best case scenario, reuse a completely cached image.

Although the development server is running within the container, it will still be able to watch for changes you make to the code on your host machine. That means the development server will still be able to reflect changes in the app as you write code and will operate similarly to if you were running the development server natively like in methods 1 or 3.

When you're done working, you can press Ctrl+C in the terminal running the container to shut it down.

---

### C) Manual Installation

This method manually does what the init script does for you.

#### 0. Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v18.16.0, but many other versions should still work.

#### 1. Install npm dependencies & devDependencies

First, open a terminal and install npm dependencies with the following command:

```console
npm install
```

_Learn more about [`npm install`](https://docs.npmjs.com/cli/v10/commands/npm-install) in the npm Docs._

#### 2. Create a development build

Next, create a dev build with webpack using this command:

```console
npm run build
```

TODO: link to webpack doc

#### (Optional) Create a `.env` file

While this is not required, your project may rely on environment variables in a `.env` file. If so, then copy the `.env.example` file and paste it as `.env`. This can be done with this command:

```console
cp .env.example .env
```

_Learn more about how this project handles environment variable files with the [`dotenv` package](https://github.com/motdotla/dotenv) from its README._

#### 3. Start the development build

Finally, start the dev build with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

## Learn More With the Documentation

[Read the docs to learn more about what else you can do with Lean JS App Starter and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/master/docs)
