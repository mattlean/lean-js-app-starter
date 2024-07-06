# Counter, Basic Version

This is a counter browser app written in [TypeScript](https://typescriptlang.org) with only native DOM APIs.

_Check out the [`counter-react` example](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/counter-react) if you want to see an alternate version of this app written with React._

## Live Demo

You can view a demo of this project live here:  
**https://counter-abdp.onrender.com**

_Note this uses [Render](https://render.com)'s free service so if the project hasn't been visited in a while, the initial page load may take longer than usual since the service has to be spun up. Also if the budget of free hours has been used up, the project will fail to load._

## Technology Overview

This project extends the [`basic-browser-ts` starter](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser-ts) with the following:

-   [Bootstrap](https://getbootstrap.com): Frontend toolkit
-   [Sass](https://sass-lang.com): CSS extension language

The remaining technologies are inherited from the starter:

-   [TypeScript](https://typescriptlang.org): JavaScript with type safety
-   [CSS](https://w3.org/Style/CSS/Overview.en.html): The standard language for styling
-   [Embedded JavaScript (EJS)](https://ejs.co): Templating language used to generate the build's `index.html` document
-   [Jest](https://jestjs.io): Testing framework used mainly for unit testing
-   [Mock Service Worker (MSW)](https://mswjs.io): API mocking library used to mock network requests
-   [Playwright](https://playwright.dev): End-to-end (E2E) testing
-   [webpack](https://webpack.js.org): Bundler used to create builds
-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and output cross-browser compatible code
-   [ESLint](https://eslint.org): Linter used to identify problems in TypeScript & JavaScript
-   [Stylelint](https://stylelint.io): Linter used to identify problems in CSS
-   [Prettier](https://prettier.io): Formatter used to enforce code style
-   [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to check for type, lint, and formatting errors before Git commits are made
-   [Docker](https://docker.com): Used for an optional containerized development environment

## Run This on Your Machine

Please refer to the ["Getting Started" section of the `basic-browser-ts` README](https://github.com/mattlean/lean-js-app-starter/tree/master/starters/basic-browser-ts#getting-started).

## LJAS Documentation

[📖 Learn more about **Lean JS App Starter** by reading its docs.](https://github.com/mattlean/lean-js-app-starter/tree/master/docs)
