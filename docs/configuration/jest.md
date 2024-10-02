# Jest Configuration

## Overview

All projects have a `jest.config.js` file in the project's root directory that acts as Jest's main [configuration file](https://jestjs.io/docs/configuration). The [`setupFilesAfterEnv` option](https://jestjs.io/docs/configuration#setupfilesafterenv-array) within it is set to load the `jest.setup.js` file (or the `jest.setup.ts` file if the project uses TypeScript) which is responsible for executing setup code before each test file is executed like [`dotenv`](https://github.com/motdotla/dotenv) or [Testing Library's `jest-dom`](https://testing-library.com/docs/ecosystem-jest-dom).

Frontend-related projects will mock styles and graphic assets in its corresponding source root directory under the `__mocks__/` directory.

When working in TypeScript-based projects, [`ts-jest`](https://kulshekhar.github.io/ts-jest) is used to enable TypeScript support with Jest.

## Learning Resources

-   [Jest Docs: Getting Started](https://jestjs.io/docs/getting-started)  
    Learn the basics of configuring Jest by setting up a basic Jest configuration from scratch.
