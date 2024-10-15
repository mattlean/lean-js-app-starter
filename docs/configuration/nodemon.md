# nodemon Configuration

## Overview

Every project may have a different mix of [nodemon configuration files](https://github.com/remy/nodemon?tab=readme-ov-file#config-files), but each file falls into one of the following two categories:

### 1. Configuration File Watch

These nodemon config files are responsible for restarting the webpack build processes when changes to configuration files occur. They are used for some `build:watch` and `dev` `package.json` scripts depending on if the script is related to a Node.js or browser context (e.g., `npm run backend:build:watch`, `npm run frontend:dev`, `npm run main:build:watch`, `npm run renderer:dev`):

-   `nodemon.json`
-   `nodemon.backend.json`
-   `nodemon.frontend.json`
-   `nodemon.main.json`
-   `nodemon.preload.json`
-   `nodemon.renderer.json`

This type of nodemon config file works in tandem with webpack, so nodemon isn't actually responsible for watching for changes in the app's source code (i.e. all the code in the `src/` directory). That's webpack's job.

Instead, nodemon watches files outside of webpack's jurisdiction like `package.json`, nodemon config files, and webpack config files (i.e. anything outside of the `src/` directory) that should still affect the build in some way.

### 2. Application Auto Reload

These nodemon config files are responsible for restarting the app process when new builds are found (i.e. changes to the `build/` directory) which essentially enables auto reloading. They are used for the `start:debug` and `dev:production` `package.json` scripts:

-   `nodemon.development.json`
-   `nodemon.production.json`

Note that `nodemon.production.json` is not actually used for production deployments. It is only used for debugging production builds.

## Learning Resources

-   [nodemon `README.md`: Usage](https://github.com/remy/nodemon?tab=readme-ov-file#usage)  
    Learn how nodemon works.
