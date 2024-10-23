# React Server-Side Rendering

This document explains the details behind the approach LJAS uses to support React server-side rendering (SSR) since there are a few different ways it could be setup.

This document is only relevant to the following SSR-based starter projects:

| Starter Project Name                  | JavaScript                                                                                                     | TypeScript                                                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| React + Express + MongoDB with SSR    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/react-express-mongo-ssr)    | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/react-express-mongo-ssr-ts)    |
| React + Express + PostgreSQL with SSR | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/react-express-postgres-ssr) | [View Source](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/starters/react-express-postgres-ssr-ts) |

## Contents

-   [Overview](#overview)
-   [Examples](#examples)

## Overview

### Separate Frontend & Backend Build Processes

There are two different webpack build processes, one for the frontend and one for the backend, and they are executed one-after-another in that order because the backend is dependent on the output of the frontend build process.

It is possible to run the backend without completing the frontend build process, but the whole reason why they are run in sequence is because the frontend build process generates the files that Express needs to render views like the JavaScript, EJS template files, images, etc. So if you run the backend build process alone, you will not be able to develop or use anything that involves a view which might not be a problem if you're working on a team exclusively as a backend API developer or something like that.

### Handling React on the Backend

webpack is configured to handle imports and compile all React-related code within the backend, so you are able to import the frontend's components and render views with them using [React DOM's server APIs](https://react.dev/reference/react-dom/server) like [`renderToString`](https://react.dev/reference/react-dom/server/renderToString).

When a user loads the app in their browser, the backend serves its rendering of the React code, and the browser will execute the JavaScript that runs [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) to have the client-side React attach to the server rendering and take over.

Also, if you want to, this setup allows you to completely avoid the single-page application (SPA) paradigm where the frontend communicates with the backend through fetch requests. You can give all responsibility of frontend rendering to the backend by using [`renderToStaticMarkup`](https://react.dev/reference/react-dom/server/renderToStaticMarkup). This eliminates the JavaScript requirement for your app which could be very beneficial depending on the use case, although it will mean that a complete page reload will occur when users perform any page navigation.

### Developing the Frontend

When you are developing the frontend, there are actually running two servers running at the same time: the Express server and [webpack-dev-server](https://webpack.js.org/configuration/dev-server).

The Express server is where all of your backend development happens, and while it is possible to develop the frontend with the Express server alone, you will need to reload the web page in the browser every time you change the code which can be cumbersome for UI development.

webpack-dev-server addresses this by running a separate instance of the frontend that essentially acts like the typical SPA that most React developers are familiar with. This second development server allows us to leverage [React Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin#readme) and avoid full page reloads when possible.

The main thing to note about developing with webpack-dev-server is that the frontend will be communicating with the Express server exclusively through fetch requests, so server-side rendering will not occur. It is important to be wary of this and make sure that you check that server-side rendering is still behaving correctly as you develop with webpack-dev-server by testing the frontend through the Express server periodically.

This means that loading the frontend through the Express server will more accurately replicate behavior in production because server-side rendering will occur. So be mindful of the fact that webpack-dev-server does deviate the true frontend behavior slightly, but understand that we take accept this trade-off so UI development can remain as streamlined as possible.

## Examples

-   [\*chan](https://github.com/mattlean/lean-js-app-starter/tree/v1.0.0/examples/starchan): Express server that server-side renders a React frontend
