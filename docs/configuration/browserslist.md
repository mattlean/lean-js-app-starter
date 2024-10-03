# Browserslist Configuration

## Overview

All projects have a [Browserslist config file](https://github.com/browserslist/browserslist?tab=readme-ov-file#config-file) called `.browserslistrc` in the project's root directory.

For Node.js-based projects, this config file determines which Node.js version is targeted.

For Electron-based projects, this config file determines which Electron version is targeted. When this is changed you will also need to update the webpack targets in `webpack/main.common.js` and `webpack/preload.common.js` to match it.

Other types of projects use [Browserslist environments](https://github.com/browserslist/browserslist?tab=readme-ov-file#configuring-for-different-environments) that change the build targets depending on the environment that the build is intended for.

For frontend-based projects, the config file determines which browsers are targeted for the development and production environments.

For server-side rendering (SSR) supporting projects, the config file has one environment that determines the target Node.js version for the backend and the target browsers for the development and production environments.

## Learning Resources

-   [Browserslist `README.md`](https://github.com/browserslist/browserslist)  
    Get a basic overview of what Browserslist is and how to configure it.
-   [`browsersl.ist`](https://browsersl.ist)  
    A useful tool to test the validity and targets for Browserslist queries.
