# \*chan

\*chan (pronounced as "starchan") is a [textboard](https://en.wikipedia.org/wiki/Textboard) written in [TypeScript](https://typescriptlang.org) with [Express](https://expressjs.com), [React](https://react.dev), and [MongoDB](https://mongodb.com).

This full-stack app has the following features:

- Anonymous discussion where users can create threads & replies without registration
- Thread list is ordered by most recently replied to least recently replied
- Deletes the least recently replied thread once the 200 thread limit has been reached
- [Express](https://expressjs.com) server that supports [React](https://react.dev) server-side rendering
- [Representational state transfer (REST) API](https://en.wikipedia.org/wiki/REST) that follows the [OpenAPI](https://swagger.io/specification) specification
- Request validation & sanitization with [express-validator](https://express-validator.github.io)
- [React](https://react.dev) frontend
- State management with [Redux Toolkit](https://redux-toolkit.js.org) and data fetching & caching with [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- Support for JavaScript-disabled browsing

## Live Demo

You can try a live demo of this app here:  
**https://starchan.onrender.com**

_Note this uses [Render](https://render.com)'s free service so if the project hasn't been visited in a while, the initial page load may take longer than usual since the service has to be spun up. Also if the budget of free hours has been used up, the project will fail to load._

## Technology Overview

This project extends the [**React + Express + MongoDB with Server-Side Rendering (TypeScript)** starter](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-mongo-ssr-ts) with the following:

- [OpenAPI](https://swagger.io/specification): REST API specification
- [Redux Toolkit](https://redux-toolkit.js.org): React state management with "modern" Redux
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview): Data fetching & caching for Redux
- [Moment](https://momentjs.com): Date library
- [React Router](https://reactrouter.com): React routing
- [express-validator](https://express-validator.github.io): Set of Express middlewares for validation & sanitization
- [Helmet](https://github.com/helmetjs/helmet): Express middleware that sets security-related HTTP response headers

The remaining technologies are inherited from the starter:

- [TypeScript](https://typescriptlang.org): JavaScript with type safety
- [Node.js](https://nodejs.org): Runtime environment that allows JavaScript to execute outside of web browsers
- [Express](https://expressjs.com): Web framework for Node.js
- [Prisma](https://prisma.io): Node.js object relational mapper (ORM) used to work with MongoDB
- [MongoDB](https://mongodb.com): NoSQL database
- [React](https://react.dev): Library for user interfaces
- [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
- [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the frontend build's `index.html` document and render Express templates
- [Jest](https://jestjs.io): Testing framework used mainly for unit testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): Unit testing library specialized for React components
- [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
- [Playwright](https://playwright.dev): End-to-end (E2E) testing
- [webpack](https://webpack.js.org): Bundler used to create builds
- [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and output cross-browser compatible code
- [ESLint](https://eslint.org): Linter used to identify problems in TypeScript & JavaScript
- [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
- [Prettier](https://prettier.io): Formatter used to enforce code style
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits are made
- [Docker](https://docker.com): Used for optional containerized development & testing environments
- [npm](https://npmjs.com): Package manager

## Running This on Your Machine

### Getting Started

Please refer to the ["Getting Started" section in the **React + Express + MongoDB with Server-Side Rendering (TypeScript)** starter's `README.md`](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/starters/react-express-mongo-ssr-ts#getting-started).

### Generating Data to Work With

If don't want to manually create threads and replies, you can also use the [`genDevData.ts`](dev-scripts/genDevData.ts) script to generate it for you. For more information on how to use it, read the [Dev Scripts `README.md`](dev-scripts/README.md).

### Caveat with Backend Jest Tests

Backend Jest tests will fail if you do not have a build on your machine. This is because the server-side rendering process relies on a view generated during the frontend build process in order to work, so make sure the init script, `npm run build`, or `npm run dev` has been run at least once before executing backend Jest tests.

## Project Background

\*chan was first created in 2012 for as a project for [Udacity's Web Application Engineering course (CS253 taught by Steve Huffman)](https://youtube.com/watch?v=CRYn30--PPk). The assignment was to build a [textboard](https://en.wikipedia.org/wiki/Textboard) web application for [ASCII art](https://en.wikipedia.org/wiki/ASCII_art). It was originally built using [Python](https://python.org), [webapp2](https://cloud.google.com/appengine/docs/legacy/standard/python/tools/webapp2), [Google Cloud Datastore](https://cloud.google.com/datastore), [GQL](https://cloud.google.com/datastore/docs/reference/gql_reference), and [Jinja](https://jinja.palletsprojects.com).

In 2018 it was rebuilt using JavaScript, [Flow](https://flow.org), [Node.js](https://nodejs.org), [Express](https://expressjs.com), [MongoDB](https://mongodb.com), [Mongoose](https://mongoosejs.com), [React](https://react.dev), [Redux](https://redux.js.org), [Redux Thunk](https://github.com/reduxjs/redux-thunk), and [Sass](https://sass-lang.com). The main purpose of this was to rebuild the project in Node.js, MongoDB, and React while implementing server-side rendering to improve SEO performance and support JavaScript-disabled browsing.

In 2023 it was rebuilt again, except this time using [TypeScript](https://typescriptlang.org) instead of JavaScript and Flow, [Prisma](https://prisma.io) instead of Mongoose, [Redux Toolkit](https://redux-toolkit.js.org) instead of classic Redux, [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) instead of Redux Thunk, and plain CSS instead of Sass. The main purpose of this was to modernize the stack and streamline the Lean JS App Starter projects involving React server-side rendering.

## LJAS Documentation

[📖 Learn more about **Lean JS App Starter** by reading its docs.](https://github.com/mattlean/lean-js-app-starter/tree/v1.1.0-dev/docs/README.md)
