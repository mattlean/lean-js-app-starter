# TypeScript Configuration

## Overview

TypeScript projects all have a `tsconfig.json` file in their project's root directory which is responsible for configuring type checking during development.

In addition to the standard `tsconfig.json`, there are more TypeScript config files specifically used for webpack processes. If there is just one webpack process, then there will only be a `tsconfig.build.json`.

If there are multiple webpack processes involved, then there will be multiple config files, each with a different suffix related to its build target. For example, the [React + Express + PostgreSQL with Server-Side Rendering starter](../../starters/react-express-postgres-ssr) has a `tsconfig.build.backend.json` and a `tsconfig.build.frontend.json`.

These webpack-specific TypeScript config files extend `tsconfig.json` and override some of the options set in it so we can type check everything during development, but still skip type checking irrelevant files for the build (i.e. tests).

Note that the [`noEmit` option](https://typescriptlang.org/tsconfig/#noEmit) is enabled as LJAS does not use `tsc` to compile TypeScript files. Instead, the webpack build process uses Babel to compile everything including TypeScript. [We explain why we do this in the FAQ document.](../faq.md#why-use-babel-over-the-official-typescript-compiler)

## Learning Resources

- [Download TypeScript](https://typescriptlang.org/download)  
  Learn how to download, install, and use the TypeScript compiler.
- [Project Configuration: What is a tsconfig.json](https://typescriptlang.org/docs/handbook/tsconfig-json.html)  
  Learn what `tsconfig.json` does and how to extend a base configuration.
