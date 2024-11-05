# Lean JavaScript Application Starter

**Lean JS App Starter (LJAS)** is a development environment designed to kickstart projects across browser, Node.js, and Electron platforms. It offers a modern developer experience, leveraging standard tools from the JavaScript ecosystem. LJAS's transparent and highly customizable configuration makes it easy to modify and meet the unique needs of your app.

**🎉 Don't just code for browsers: build servers, desktop apps, CLI tools, and more**

> Support for [TypeScript](https://typescriptlang.org), [Node.js](https://nodejs.org), [Electron](https://electronjs.org), [React](https://react.dev), and [Express](https://expressjs.com) servers that support React server-side rendering.

**🐳 Docker development & testing environments**

> Alternatively run the dev environment with [Docker](https://docker.com) to simplify onboarding and improve consistency for developers across macOS, Windows, and Linux. Use a specialized Docker test environment to improve the stability and trustworthiness of end-to-end test results.

**🧪 Robust testing environment**

> Write unit tests with [Jest](https://jestjs.io) and end-to-end tests with [Playwright](https://playwright.dev). Test frontends with [Testing Library](https://testing-library.com) and backend APIs with [SuperTest](https://github.com/ladjs/supertest). Mock network requests with [MSW](https://mswjs.io).

**🗄️ Support for PostgreSQL & MongoDB**

> Connect to [PostgreSQL](https://postgresql.org) and [MongoDB](https://mongodb.com) easily with [Prisma](https://prisma.io). Containerized databases are available so you aren't required to install databases natively on your machine.

**⚡ Hot module replacement & auto-reloading**

> See changes reflected quickly in your app as soon as you save changes to your code.

**📦 Optimized builds for production environments**

> Generate optimized builds specialized for running in production environments. Output cross-browser compatible bundles for the web or OS-specific executable bundles for Linux, macOS, or Windows.

**🧼 Effortlessly maintain consistent code style**

> Stop worrying about needing to remember rules or having disagreements with other team members about code styling. Just let [Prettier](https://prettier.io) and [ESLint](https://eslint.org) enforce code style for you.

**⛷️ Smoothly move across multiple projects**

> The project setup and configuration consistency allows developers working on multiple LJAS-based projects to move back-and-forth between them easily. If you are familiar with one LJAS project then you will be comfortable working with all of them, regardless if the build target is a browser, Node.js, or Electron.

**🥇 Powered by the gold standards of the JS tooling ecosystem**

> Nothing fancy and no surprises–the core tools are [webpack](https://webpack.js.org), [Babel](https://babeljs.io), and [ESLint](https://eslint.org). The configurations are intentionally designed to follow standard conventions so they are easy to understand and customize.

## Documentation

**🤔 Need help deciding if LJAS is right for your project?**

> Read the ["Motivation" document in the docs](./docs/motivation.md).

**📖 Learn about everything LJAS has to offer!**

> [Check out all of the documentation!](./docs/README.md)

## Getting Started

LJAS offers several different **starter projects** with various different technologies pre-configured for you. Each one is designed for different targets like the browser or Node.js, and can also utilize different technologies such as JavaScript, TypeScript, React, or Express, etc. They are all designed as complete development environments that you can rely on out-of-the-box.

Select a starter project below that fits your needs:

| Starter Project Name                  | Description                                                                                                                           | JavaScript                                                                                                                                                                                                                                      | TypeScript                                                                                                                                                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic Browser                         | A simple setup for a browser frontend built with just vanilla JavaScript or TypeScript.                                               | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-browser) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-browser_1-1-0.zip)                           | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-browser-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-browser-ts_1-1-0.zip)                           |
| Basic Electron                        | A simple setup for an Electron desktop app built with just vanilla JavaScript or TypeScript.                                          | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-electron) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-electron_1-1-0.zip)                         | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-electron-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-electron-ts_1-1-0.zip)                         |
| Basic Node.js                         | A simple setup for a Node.js app built with just vanilla JavaScript or TypeScript.                                                    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-node) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-node_1-1-0.zip)                                 | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/basic-node-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-basic-node-ts_1-1-0.zip)                                 |
| Express + MongoDB                     | A web server that runs off Node.js, Express, MongoDB, and Prisma.                                                                     | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/express-mongo) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-express-mongo_1-1-0.zip)                           | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/express-mongo-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-express-mongo-ts_1-1-0.zip)                           |
| Express + PostgreSQL                  | A web server that runs off Node.js, Express, PostgreSQL, and Prisma.                                                                  | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/express-postgres) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-express-postgres_1-1-0.zip)                     | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/express-postgres-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-express-postgres-ts_1-1-0.zip)                     |
| React + Browser                       | A browser frontend that uses React.                                                                                                   | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-browser) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-browser_1-1-0.zip)                           | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-browser-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-browser-ts_1-1-0.zip)                           |
| React + Electron                      | An Electron desktop app that uses React for its renderer processes.                                                                   | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-electron) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-electron_1-1-0.zip)                         | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-electron-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-electron-ts_1-1-0.zip)                         |
| React + Express + MongoDB with SSR    | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-mongo-ssr) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-express-mongo-ssr_1-1-0.zip)       | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-mongo-ssr-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-express-mongo-ssr-ts_1-1-0.zip)       |
| React + Express + PostgreSQL with SSR | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-postgres-ssr) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-express-postgres-ssr_1-1-0.zip) | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0/starters/react-express-postgres-ssr-ts) / [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.1.0/ljas-react-express-postgres-ssr-ts_1-1-0.zip) |

## Examples

**Example projects** are built off of starter projects and act as a demonstration of how LJAS can used and adapted to different project requirements.

You will be able to find projects like SPAs, REST APIs, desktop apps, and more. They can be handy if you need references for customized configurations that extend LJAS's functionality or some good ol' inspiration.

[Take a look at the example projects in the `examples/` directory.](./examples)

## License

Lean JavaScript Application Starter is open source software [licensed as MIT](https://github.com/mattlean/lean-js-app-starter/blob/v1.1.0/LICENSE).
