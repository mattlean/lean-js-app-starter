# webpack Configuration

## Overview

Most webpack configurations you'll come across on the web will cram all of their configuration in one huge `webpack.config.js` file, but as your configuration grows in complexity and size, stuffing everything into one file can hurt readability and maintainability. This is why LJAS splits its webpack config across multiple files and then uses [`webpack-merge`](https://npmjs.com/package/webpack-merge) to combine the relevant config files for the given environment.

Every webpack process is split into four types of files:

-   `*.config.js`: The entry point into the webpack process's configuration.
-   `*.development.js`: Configurations specifically for the development build.
-   `*.production.js`: Configurations specifically for the production build.
-   `*.common.js`: Configurations that are common for all builds.

If there is only one webpack process in the project's build process, you will find the webpack config files in the project's root directory prefixed with `webpack`, e.g. `webpack.config.js`, `webpack.production.js`, etc.

If the project's build process involves multiple webpack processes, each one will have its own set of four config files as described above in the `webpack/` directory. What differentiates each set of config files will be its prefix which will correspond to the webpack process it's for. For example, the [React + Express + PostgreSQL with Server-Side Rendering starter](../../starters/react-express-postgres-ssr) has two webpack processes: one for the backend and one for the frontend. The set of config files relevant to the backend will be prefixed with `backend`, and the frontend will have its own equivalent prefixed with `frontend`.

LJAS also uses webpack configuration parts from our own package called [`ljas-webpack`](../../ljas-webpack). This allows us to easily reuse common webpack config code across multiple projects. [If you would like to learn more about `webpack-merge` and `ljas-webpack`, we go more into detail on how it all works together in `ljas-webpack`'s `README.md`.](../../ljas-webpack/README.md)

## Learning Resources

-   [webpack's "Getting Started" guide](https://webpack.js.org/guides/getting-started)  
    Learn the basics of webpack from the "Getting Started" guide in the webpack docs.
-   [webpack's "Production" guide](https://webpack.js.org/guides/production)  
     Learn about webpack's best practices and write a configuration for production.
-   [SurviveJS webpack book](https://survivejs.com/books/webpack)  
    A free book on webpack that starts from the basics and goes all the way to advanced techniques that will teach you how to get the most out of webpack. It was written by one of the founders of the webpack core team, [Juho Vepsäläinen](https://survivejs.com/about-me).
    -   ["Composing Configuration" chapter](https://survivejs.com/webpack/developing/composing-configuration)  
        This particular chapter is the most important one in the book because this is where LJAS's webpack configuration composition strategy comes from. It explains what webpack config parts are and how to compose webpack configs with `webpack-merge`.
