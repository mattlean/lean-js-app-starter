# ESLint Configuration

## Overview

All projects have one ESLint config file found in the project's root directory as `.eslintrc.js`. The [`overrides`](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated#how-do-overrides-work) property specifies subconfigurations specific to certain directories. For example, all projects have their default ESLint configuration, but then there will be a specific override subconfiguration for Jest which will import plugins like [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest) which are unnecessary for other directories in the codebase.

All projects also have one `.eslintignore` file in the project's root directory as well which tells ESLint which files and directories should be skipped when linting.

Note that we currently use the [deprecated config system](https://eslint.org/docs/latest/use/configure/configuration-files-deprecated) which will be changed when we updated to ESLint v9.x in a future LJAS version.

## Learning Resources

-   [Getting Started with ESLint](https://eslint.org/docs/v8.x/use/getting-started)  
    Learn the basics of configuring ESLint by setting up a basic ESLint configuration from scratch.
