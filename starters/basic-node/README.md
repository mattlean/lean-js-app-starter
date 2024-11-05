# Basic Node.js Starter

This is a [**Lean JS App Starter (LJAS)**](https://github.com/mattlean/lean-js-app-starter) starter project for a [Node.js](https://nodejs.org) application written in vanilla JavaScript.

_If you need TypeScript, then use the [Basic Node.js starter (TypeScript)](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-node-ts) instead._

## Technology Overview

- [JavaScript](https://tc39.es/ecma262): Just plain, vanilla JavaScript
- [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
- [Jest](https://jestjs.io): Testing framework
- [webpack](https://webpack.js.org): Bundler used to create builds
- [Babel](https://babeljs.io): Compiler used with webpack to output Node.js-compatible code
- [ESLint](https://eslint.org): Linter used to identify problems in JavaScript
- [Prettier](https://prettier.io): Formatter used to enforce code style
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for lint and formatting errors before Git commits are made
- [Docker](https://docker.com): Used for an optional containerized development environment
- [npm](https://npmjs.com): Package manager

## Getting Started

First, [**download the starter project's ZIP file**](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-node_1-1-0.zip) and extract it.

Then, choose one of the following methods:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Docker Development Environment (Recommended)](#method-2-docker-development-environment-recommended)
3. [Manual Installation](#method-3-manual-installation)

---

### Method 1: Initialization Script (Recommended)

This method is the simplest if you are not using the Docker dev environment (method 2).

#### Prerequisites

The only prerequisite is that you must have [Node.js](https://nodejs.org/en/download/package-manager) installed.

This was tested on Node.js v20.9.0, but any version from >=20.9 to <21 will work.

#### Step 1. Run the initialization script

Open a terminal and run the init script in the project's root directory. This will perform all of the setup for you like creating a `.env` file and installing npm dependencies:

```console
bash init.sh
```

[_Note: Learn exactly what the init script is doing in method 3._](#method-3-manual-installation)

#### Step 2. Start the development build

Start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

---

### Method 2: Docker Development Environment (Recommended)

This method is the simplest as it only only requires Docker. You won't even need to worry about Node.js since the dev environment will use a separate Node.js process inside the container.

For more information on the Docker dev environment, please read the ["Docker Environments" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/v1.1.0/docs/developing/docker-environments.md).

#### Prerequisites

The only prerequisite is that you must have [Docker](https://docker.com/get-started) installed.

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### Step 1. Start the Docker development environment

Start the Docker dev environment with the following command:

```console
docker compose up
```

When you're done working, you can press Ctrl+C in the terminal running the container to shut it down.

---

### Method 3: Manual Installation

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

#### Step 2. Create a development build

Create a dev build with webpack using this `package.json` script:

```console
npm run build
```

[_Note: Learn more about the build process in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.1.0/docs/building.md)

#### (Optional) Create a `.env` file

If your project relies on a `.env` file, then copy the `.env.example` file and paste it as `.env`. This can be done with this command in the project's root directory:

```console
cp .env.example .env
```

[_Note: Learn more about the `.env` file in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.1.0/docs/configuration/dotenv-file.md)

#### Step 3. Start the development build

Finally, start the dev build with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev build to shut it down.

[_Note: Learn more about the `dev` `package.json` script in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.1.0/docs/developing/javascript-typescript.md#auto--hot-reloading)

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter**.](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/docs/README.md)
