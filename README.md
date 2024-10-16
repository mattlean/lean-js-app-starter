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

> Nothing fancy and no surprises–the core tools are [webpack](https://webpack.js.org), [Babel](https://babeljs.io), and [ESLint](https://eslint.org). The configurations are intentionally designed by default to follow standard conventions, so they are easy to understand and customize.

## Documentation

**🤔 Need help deciding if LJAS is right for your project?**

> Read the ["Motivation" document](./docs/motivation.md).

**📖 Learn about everything LJAS has to offer!**

> [Check out the docs!](./docs)

## Getting Started

LJAS offers several different **starter projects** with various different technologies pre-configured for you. Each one is designed for different targets like the browser or Node.js, and can also utilize different technologies such as JavaScript, TypeScript, React, or Express, etc. They are all designed as complete development environments that you can rely on out-of-the-box.

Select a starter project below that fits your needs:

| Starter Project Name                  | Description                                                                                                                           | JavaScript                                                                                                                                                                                                                                            | TypeScript                                                                                                                                                                                                                                                  |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic Browser                         | A simple setup for a browser frontend built with just vanilla JavaScript or TypeScript.                                               | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-browser_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-browser)                           | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-browser-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-browser-ts)                           |
| Basic Electron                        | A simple setup for an Electron desktop app built with just vanilla JavaScript or TypeScript.                                          | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-electron_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-electron)                         | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-electron-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-electron-ts)                         |
| Basic Node.js                         | A simple setup for a Node.js app built with just vanilla JavaScript or TypeScript.                                                    | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-node_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-node)                                 | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-basic-node-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/basic-node-ts)                                 |
| Express + MongoDB                     | A web server that runs off Node.js, Express, MongoDB, and Prisma.                                                                     | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-express-mongo_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-mongo)                           | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-express-mongo-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-mongo-ts)                           |
| Express + PostgreSQL                  | A web server that runs off Node.js, Express, PostgreSQL, and Prisma.                                                                  | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-express-postgres_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-postgres)                     | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-express-postgres-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/express-postgres-ts)                     |
| React + Browser                       | A browser frontend that uses React.                                                                                                   | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-browser_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-browser)                           | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-browser-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-browser-ts)                           |
| React + Electron                      | An Electron desktop app that uses React for its renderer processes.                                                                   | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-electron_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-electron)                         | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-electron-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-electron-ts)                         |
| React + Express + MongoDB with SSR    | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-express-mongo-ssr_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-mongo-ssr)       | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-express-mongo-ssr-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-mongo-ssr-ts)       |
| React + Express + PostgreSQL with SSR | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-express-postgres-ssr_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-postgres-ssr) | [Download](https://github.com/mattlean/lean-js-app-starter/releases/download/v1.0.0-rc/ljas-react-express-postgres-ssr-ts_1-0-0.zip) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-rc/starters/react-express-postgres-ssr-ts) |

## Examples

**Example projects** are built off of starter projects and act as a demonstration of how LJAS can used and adapted to different project requirements.

You will be able to find projects like SPAs, REST APIs, desktop apps, and more. They can be handy if you need references for customized configurations that extend LJAS's functionality or just some good ol' inspiration.

[Take a look at the example projects in the `examples/` directory.](./examples)

## License

Lean JavaScript Application Starter is open source software [licensed as MIT](https://github.com/mattlean/lean-js-app-starter/blob/master/LICENSE).
