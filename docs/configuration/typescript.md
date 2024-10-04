# TypeScript Configuration

## Overview

TypeScript projects all have a `tsconfig.json` file in their project's root directory which is responsible for type checking during development.

In addition to the standard `tsconfig.json`, there are more TypeScript config files specifically used for webpack processes. If there is just one webpack process, then there will only be a `tsconfig.build.json`. If there are multiple webpack processes involved, then there will be multiple config files, each with a different suffix depending on its build target. For example, the [React + Express + PostgreSQL with Server-Side Rendering starter](../starters/react-express-postgres-ssr) has a `tsconfig.build.frontend.json` and a `tsconfig.build.backend.json`.

The TypeScript config files for webpack processes use `tsconfig.json` as a base configuration and override some of the options set in it so we can type check everything during development but skip type checking for files irrelevant to the build (i.e. tests).

## Learning Resources

-   [Download TypeScript](https://typescriptlang.org/download)  
    Learn how to download, install, and use the TypeScript compiler.
-   [Project Configuration: What is a tsconfig.json](https://typescriptlang.org/docs/handbook/tsconfig-json.html)  
    Learn what `tsconfig.json` does and how to extend a base configuration.
