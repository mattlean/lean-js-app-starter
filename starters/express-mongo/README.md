# Express + MongoDB Starter

This is a [**Lean JS App Starter (LJAS)**](https://github.com/mattlean/lean-js-app-starter) starter project for an [Express](https://expressjs.com) application written in vanilla JavaScript that works with [MongoDB](https://mongodb.com).

_If you need TypeScript, then use the [Express + MongoDB starter (TypeScript)](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/express-mongo-ts) instead._

## Technology Overview

-   [JavaScript](https://tc39.es/ecma262): Just plain, vanilla JavaScript
-   [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
-   [Express](https://expressjs.com): Web framework for Node.js
-   [Prisma](https://prisma.io): Node.js object relational mapper (ORM) used to work with MongoDB
-   [MongoDB](https://mongodb.com): NoSQL database
-   [Jest](https://jestjs.io): Testing framework
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to output Node.js-compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in JavaScript
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for lint and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment
-   [npm](https://npmjs.com): Package manager

## Getting Started

First, [**download the starter project's ZIP file**](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0/ljas-express-mongo_1-0-0.zip) and extract it.

Then, choose one of the following methods:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Docker Development Environment (Recommended)](#method-2-docker-development-environment-recommended)
3. [Manual Installation](#method-3-manual-installation)

---

### Method 1: Initialization Script (Recommended)

This method is the simplest if you are not using the Docker dev environment (method 2).

#### Prerequisites

Installation of the following is required before proceeding with this method:

-   [Node.js](https://nodejs.org/en/download/package-manager)
-   [MongoDB](https://mongodb.com)

This was tested on Node.js v20.9.0, but any version from >=20.9 to <21 will work. This was also tested with MongoDB 4.4.25, but any version from >=4.4 to <5 will work.

#### Step 1. Create a `.env` file & define `DATABASE_URL`

Open a terminal and use the init script in the project's root directory to create a `.env` file:

```console
bash init.sh --skip-build --skip-npm-ci --skip-prisma
```

Next, edit the `.env` file's `DATABASE_URL` environment variable to the appropriate [connection string](https://prisma.io/docs/orm/overview/databases/mongodb#connection-details) so Prisma can connect to MongoDB.

#### Step 2. Run the initialization script

Run the init script in the project's root directory. This will perform all of the setup for you like creating a `.env` file and installing npm dependencies:

```console
bash init.sh
```

[_Note: Learn exactly what the init script is doing in method 3._](#method-3-manual-installation)

#### Step 3. Start the development server

Start the dev server with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

---

### Method 2: Docker Development Environment (Recommended)

This method is the simplest as it only requires Docker. You won't even need to worry about installing and configuring Node.js, MongoDB, and Prisma as they are all setup for you inside containers.

For more information on the Docker dev environment, please read the ["Docker Environments" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/developing/docker-environments.md).

#### Prerequisites

The only prerequisite is that you must have [Docker](https://docker.com/get-started) installed.

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### Step 1. Create a `.env` file

Open a terminal and create a `.env` file through the init script in the project's root directory:

```console
bash init.sh --skip-build --skip-npm-ci --skip-prisma
```

#### Step 2. Start the Docker development environment

Start the Docker dev environment by running the following command in a project directory:

```console
docker compose up
```

When you're done working, you can press Ctrl+C in the terminal running the Docker dev environment to shut it down.

---

### Method 3: Manual Installation

This method manually does what the init script does for you normally.

#### Prerequisites

Installation of the following is required before proceeding with this method:

-   [Node.js](https://nodejs.org/en/download/package-manager)
-   [MongoDB](https://mongodb.com)

This was tested on Node.js v20.9.0, but any version from >=20.9 to <21 will work. This was also tested with MongoDB 4.4.25, but any version from >=4.4 to <5 will work.

#### Step 1. Install npm dependencies

First, open a terminal, navigate to your project's root directory, and install npm dependencies with the following command:

```console
npm ci
```

[_Note: Learn more about `npm ci` in the npm Docs._](https://docs.npmjs.com/cli/v10/commands/npm-ci)

#### Step 2. Create a `.env` file & define `DATABASE_URL`

Copy the `.env.example` file and paste it as the `.env` file. This can be done with this command in the project's root directory:

```console
cp .env.example .env
```

Next, edit the `.env` file's `DATABASE_URL` environment variable to the appropriate [connection string](https://prisma.io/docs/orm/overview/databases/mongodb#connection-details) so Prisma can connect to MongoDB.

[_Note: Learn more about the `.env` file in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/configuration/dotenv-file.md)

#### Step 3. Setup database with Prisma

Setup Prisma and the database by running the following commands:

```console
npm run prisma db push
npm run prisma generate
```

_Learn more about [`prisma db push`](https://prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema) and [`prisma generate`](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) in the Prisma docs._

#### Step 4. Create a development build

Create a dev build with webpack using this `package.json` script:

```console
npm run build
```

[_Note: Learn more about the build process in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/building.md)

#### Step 5. Start the development server

Finally, start the dev server with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

[_Note: Learn more about the `dev` `package.json` script in the LJAS docs._](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0/docs/developing/javascript-typescript.md#auto--hot-reloading)

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter**.](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/docs)
