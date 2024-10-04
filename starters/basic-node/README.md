# Basic Node.js Starter

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for a [Node.js](https://nodejs.org) application.

_If you need TypeScript, then use the [Basic Node.js starter (TypeScript)](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-node-ts) instead._

## Technology Overview

-   [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
-   [Jest](https://jestjs.io): Testing framework
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to output Node.js-compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in JavaScript
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for lint and formatting errors before Git commits are made
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

#### Step 2. Start the development build

Start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

---

### Method 2: Docker Development Environment (Recommended)

This method is the simplest as it only only requires Docker and has one step. Also, you won't need to worry about which Node.js version your machine is running because the dev environment will use a separate Node.js process running inside the container.

For more information on the Docker dev environment, please read the ["Docker Environments" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/master/docs/developing/docker-environments.md).

#### Prerequisites

The only requirement is [Docker](https://docker.com/get-started).

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### Step 1. Start the Docker development environment

Start the Docker dev environment with the following command:

```console
docker compose up
```

When you're done working, you can press Ctrl+C in the terminal running the container to shut it down.

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

#### Step 2. Create a development build

Create a dev build with webpack using this command:

```console
npm run build
```

For more information on the build process, please read the ["Building" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/master/docs/building.md).

#### (Optional) Create a `.env` file

If your project relies on a `.env` file, then copy the `.env.example` file and paste it as `.env`. This can be done with this command:

```console
cp .env.example .env
```

_Learn more about how this project handles environment variable files with the [`dotenv` package from its `README.md`](https://github.com/motdotla/dotenv)._

#### Step 3. Start the development build

Finally, start the dev build with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter** and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/master/docs)
