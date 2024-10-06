# React + Express + MongoDB with Server-Side Rendering Starter

This is a **[Lean JS App Starter](https://github.com/mattlean/lean-js-app-starter)** project for an [Express](https://expressjs.com) application that supports [React](https://react.dev) server-side rendering. It works with a [MongoDB](https://mongodb.com) database.

_If you need TypeScript, then use the [React + Express + MongoDB with SSR starter (TypeScript)](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/starters/react-express-mongo-ssr-ts) instead._

## Technology Overview

-   [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
-   [Express](https://expressjs.com): Web framework for Node.js
-   [Prisma](https://prisma.io): Node.js object relational mapper (ORM) used to work with MongoDB
-   [MongoDB](https://mongodb.com): NoSQL database
-   [React](https://react.dev): Library for user interfaces
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the frontend build's `index.html` document and render Express templates
-   [Jest](https://jestjs.io): Testing framework used mainly for unit testing
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Unit testing library specialized for React components
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [Playwright](https://playwright.dev): End-to-end (E2E) testing
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to output cross-browser compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in JavaScript
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for lint and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment
-   [npm](https://npmjs.com): Package manager

## Getting Started

There are three different methods you can use to get started:

1. [Initialization Script (Recommended)](#method-1-initialization-script-recommended)
2. [Docker Development Environment (Recommended)](#method-2-docker-development-environment-recommended)
3. [Manual Installation](#method-3-manual-installation)

---

### Method 1: Initialization Script (Recommended)

This method is the simplest if you are not using the Docker dev environment (method B).

#### Prerequisites

Installation of the following is required before proceeding with this method:

-   [Node.js](https://nodejs.org/en/download/package-manager)
-   [MongoDB](hhttps://mongodb.com)

This was tested on Node.js v20.9.0, but any version >= 20.9 to <21 should still work. This was also tested with MongoDB 4.4.25, and any other Mongo 4 version should work well.

#### Step 1. Run the initialization script

Open a terminal and run the init script in the project root directory which will execute all the setup commands like `npm install` for you:

```console
bash init.sh
```

#### Step 2. Connect Prisma to MongoDB

Update the `.env` file's `DATABASE_URL` environment variable to the appropriate connection string so Prisma can connect to MongoDB.

For more info on this, read the [Prisma MongoDB docs](https://prisma.io/docs/orm/overview/databases/mongodb#connection-details).

#### Step 3. Start the development server

Start the dev server with this `package.json` script:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

---

### Method 2: Docker Development Environment (Recommended)

This method is the simplest as it only has one prerequisite and has MongoDB and Prisma setup for you.

For more information on the Docker dev environment, please read the ["Docker Environments" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0-dev/docs/developing/docker-environments.md).

#### Prerequisites

The only requirement is [Docker](https://docker.com/get-started).

This was tested on Docker Desktop 4.20.0, but many other Docker versions should still work.

#### Step 1. Create a `.env` file

This can be done with the init script in the project root directory:

```console
bash init.sh --skip-build --skip-npm-install --skip-prisma
```

#### Step 2. Start the Docker development environment

Start the Docker dev environment by running the following command in a project directory:

```console
docker compose up
```

When you're done working, you can press Ctrl+C in the terminal running the Docker dev environment to shut it down.

---

### Method 3: Manual Installation

This method manually does what the init script does for you.

#### Prerequisites

Installation of the following is required before proceeding with this method:

-   [Node.js](https://nodejs.org/en/download/package-manager)
-   [MongoDB](hhttps://mongodb.com)

This was tested on Node.js v20.9.0, but any version >= 20.9 to <21 should still work. This was also tested with MongoDB 4.4.25, and any other Mongo 4 version should work well.

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

#### Step 3. Setup & connect Prisma to MongoDB

Setup Prisma and the database by running the following commands:

```console
npm run prisma db push
npm run prisma generate
```

_Learn more about [`prisma db push`](https://prisma.io/docs/orm/prisma-migrate/workflows/prototyping-your-schema) and [`prisma generate`](https://prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client) in the Prisma docs._

Update the `.env` file's `DATABASE_URL` environment variable to the appropriate connection string so Prisma can connect to MongoDB.

For more info on this, read the [Prisma MongoDB docs](https://prisma.io/docs/orm/overview/databases/mongodb#connection-details).

#### Step 4. Create a development build

Create a dev build with webpack using this command:

```console
npm run build
```

For more information on the build process, please read the ["Building" document in the LJAS docs](https://github.com/mattlean/lean-js-app-starter/blob/v1.0.0-dev/docs/building.md).

#### Step 5. Start the development server

Finally, start the dev server with following command:

```console
npm run dev
```

When you're done working, you can press Ctrl+C in the terminal running the dev server to shut it down.

## Learn More With the Documentation

[📖 Read the docs to learn more about what else you can do with **Lean JS App Starter** and how it works.](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/docs)
