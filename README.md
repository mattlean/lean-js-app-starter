# Lean JavaScript Application Starter

**Lean JS App Starter (LJAS)** is a development environment that is designed to get you up and running as quickly as possible while being open and adaptable to your code's ever-changing needs as your app grows.

-   🎉 **More than just JavaScript & browsers: build servers, desktop apps, CLI tools, and more!**  
    Support for [TypeScript](https://typescriptlang.org), [Node.js](https://nodejs.org), [Electron](https://electronjs.org), [React](https://react.dev), and [Express](https://expressjs.com) servers that support React server-side rendering.
-   🐳 **Docker development environment**  
    Alternatively run the dev environment in a [Docker container](https://docker.com) to improve consistency for developers across macOS, Windows, and Linux.
-   🧪 **Robust testing environment**  
    Write unit tests with [Jest](https://jestjs.io) and end-to-end tests with [Playwright](https://playwright.dev). Test frontends with [Testing Library](https://testing-library.com) and backend APIs with [SuperTest](https://github.com/ladjs/supertest). Mock network requests with [MSW](https://mswjs.io).
-   🗄️ **Support for PostgreSQL & MongoDB**  
     Connect to [PostgreSQL](https://postgresql.org) and [MongoDB](https://mongodb.com) easily with [Prisma](https://prisma.io). Containerized databases are available so you aren't required to install databases directly on your machine.
-   ⚡ **Hot module replacement & auto-reloading**  
    See changes reflected quickly in your app as soon as you save changes to your code.
-   📦 **Optimized builds for production environments**  
    Generate optimized builds specialized for running in production environments. Output cross-browser compatible bundles for the web or OS-specific executable bundles for Linux, macOS, or Windows.
-   🧼 **Effortlessly maintain consistent code style**  
     Stop worrying about needing to remember rules or having disagreements with other team members about code styling. Just let [Prettier](https://prettier.io) and [ESLint](https://eslint.org) enforce code style for you.
-   🥇 **Powered by the gold standards of the JS build tool ecosystem**  
    Nothing fancy and no surprises–it's just [webpack](https://webpack.js.org), [Babel](https://babeljs.io), and [ESLint](https://eslint.org). The configurations are intentionally designed to follow standard conventions out-of-the-box, so they are easy to understand and customize.

## Documentation

-   🤔 Need help deciding if LJAS is right for you? Read ["Why Lean JS App Starter?"](./docs/why.md)

-   🤿 To learn more about everything LJAS has to offer: [dive into the docs!](./docs)

## Getting Started

**Starter projects** are development environments that essentially act as the foundation for you to starting building off of. Each one is designed for different environments like the browser or Node.js, and each can also utilize different technologies such as JavaScript, TypeScript, React, or Express, etc.

Select a starter project below that fits your needs to learn about what each one offers:

| Starter                               | Description                                                                                                                           | JavaScript                                                                                                                                                      | TypeScript                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic Browser                         | A simple setup for a frontend built with just vanilla JavaScript or TypeScript.                                                       | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| Basic Electron                        | A simple setup for an Electron desktop app built with just vanilla JavaScript or TypeScript.                                          | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| Basic Node.js                         | A simple setup for a Node.js app built with just vanilla JavaScript or TypeScript.                                                    | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| Express + MongoDB                     | A web server that runs off Node.js, Express, MongoDB, and Prisma.                                                                     | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| Express + PostgreSQL                  | A web server that runs off Node.js, Express, PostgreSQL, and Prisma.                                                                  | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| React Browser                         | A frontend that uses React.                                                                                                           | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| React Electron                        | An Electron desktop app that uses React for its renderer processes.                                                                   | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| React + Express + MongoDB with SSR    | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |
| React + Express + PostgreSQL with SSR | A full-stack web app that runs off Node.js, Express, PostgreSQL, Prisma, and React. The backend supports React server-side rendering. | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) | [Download](https://github.com/mattlean/lean-js-app-starter) / [View Source](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser) |

## Examples

**Example projects** are built off of starter projects and act as a demonstration of what your own work could look like. They can be handy if you need references for customized configurations that extend LJAS's functionality or just some good ol' inspiration.

[Take a look at the example projects in the `examples/` directory.](./examples/)

## License

Lean JavaScript Application Starter is open source software [licensed as MIT](https://choosealicense.com/licenses/mit).
