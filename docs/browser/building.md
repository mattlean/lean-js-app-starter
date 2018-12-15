# Web Browser: Building
## Production
Use the `build` [`package.json`](../../package.json) script to create a build for the production environment. This will involve everything you need to ensure your app works for all targeted browsers while having an optimized build size.

You can use the `build:debug` [`package.json`](../../package.json) script to use the Node.js inspector to debug the webpack configuration, or use `build:stats` to generate a `stats.production.json` file in the project root directory which can be used TODO

For more details on what the webpack build process is doing, read the ["webpack configuration" documentation](configuration.md#webpack).

## Development
Use the `build:dev` [`package.json`](../../package.json) script to create a build for the development environment. The build process will prioritize options that will shortern build times and make development more convenient.

You can use the `build:dev:debug` [`package.json`](../../package.json) script to use the Node.js inspector to debug the webpack configuration, or use `build:dev:stats` to generate a `stats.development.json` file in the project root directory which can be used TODO

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).