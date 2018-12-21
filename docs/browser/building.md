# Web Browser: Building
## Production
Use the `build` [`package.json`](../../package.json) script to create a build for the production environment. This will involve everything you need to ensure your app works for all targeted browsers while having an optimized build size.

The `build:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with the Node.js inspector. The `build:stats` [`package.json`](../../package.json) script generates a `stats.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).

## Development
Use the `build:dev` [`package.json`](../../package.json) script to create a build for the development environment. The build process will prioritize options that will shortern build times and make development more convenient. Although you can use this script alongside the `start:dev` [`package.json`](../../package.json) script to develop, it is highly recommended you normally use the `start:dev:watch` [`package.json`](../../package.json) script to utilize auto-reloading and hot loading instead.

The `build:dev:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with the Node.js inspector. The `build:dev:stats` [`package.json`](../../package.json) script generates a `stats.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).