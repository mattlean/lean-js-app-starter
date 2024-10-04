# Playwright Configuration

## Overview

All frontend-based projects will have Playwright configured through the `playwright.config.js` file in the project's root directory.

The [Playwright config](https://playwright.dev/docs/test-configuration) most uses the defaults except that it sets the [`testDir` property](https://playwright.dev/docs/api/class-testconfig#test-config-test-dir) to `.src/playwright`. For Electron-based projects, the [`projects` property](https://playwright.dev/docs/api/class-testconfig#test-config-projects) reduces the browser to only Chromium as that is the only browser needed for Electron.

## Learning Resources

-   [Playwright Docs: Getting Started - Installation](https://playwright.dev/docs/intro)  
    Learn the basics of setting up a basic Playwright configuration by installing Playwright.
