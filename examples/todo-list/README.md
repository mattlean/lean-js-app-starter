# Todo List (Legacy)

This is a todo list [single-page application (SPA)](https://en.wikipedia.org/wiki/Single-page_application) written in JavaScript and [Flow](https://flow.org) with [React](https://react.dev) and [Redux](https://redux.js.org). It simulates interaction with a mock backend API.

Note that this project utilizes React v16.7 (pre-hook era code), "classic" Redux, and Enzyme. If you want to see an example using React hooks, modern Redux through Redux Toolkit, and React Testing Library, please checkout the [**\*chan** example](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/starters/starchan).

Be aware that this was ported from LJAS v0.1.1 is classified as a legacy project. That means it lacks a few features the other projects have (such as Playwright) and will not receive future upgrades for many of its dependencies.

## Live Demo

You can try a live demo of this app here:  
**https://todo-list-jk0o.onrender.com**

_Note this uses [Render](https://render.com)'s free service so if the project hasn't been visited in a while, the initial page load may take longer than usual since the service has to be spun up. Also if the budget of free hours has been used up, the project will fail to load._

## Technology Overview

This project extends the [**React + Browser** starter](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/starters/react-browser) with the following:

-   [React (v16.7)](https://react.dev): Library for user interfaces, uses pre-hook era code
-   [Flow](https://flow.org): Static type checker, alternative to TypeScript
-   [Redux](https://redux.js.org): React state management with "classic" Redux
-   [Redux Thunk](https://github.com/reduxjs/redux-thunk): Redux middleware used to execute network requests and store responses in Redux store
-   [Enzyme](https://enzymejs.github.io/enzyme): React testing utility, alternative to React Testing Library
-   [Sublime Text](https://sublimetext.com): Code editor, alternative to Visual Studio Code
-   [Yarn](https://yarnpkg.com): Package manager, alternative to npm

The remaining technologies are inherited from the starter:

-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework used mainly for unit testing
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to output cross-browser compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in JavaScript
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for lint and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment
-   [npm](https://npmjs.com): Package manager

## Run This on Your Machine

Please refer to the ["Getting Started" section in the **React + Browser** starter's `README.md`](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/starters/react-browser#getting-started).

## Project Background

This project was originally created following [Dan Abramov's Fundamentals of Redux Course](https://egghead.io/courses/fundamentals-of-redux-course-from-dan-abramov-bd5cc867).

## LJAS Documentation

[📖 Learn more about **Lean JS App Starter** by reading its docs.](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0-dev/docs)
