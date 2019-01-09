# Web Browser: Building
## Production
Use the `build` [`package.json`](../../package.json) script to create a build for the production environment with webpack. This will involve everything you need to ensure your app works for all targeted browsers while having an optimized build size. To run the build, use the `start` [`package.json`](../../package.json) script.

The `build:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with the Node.js inspector. The `build:stats` [`package.json`](../../package.json) script generates a `stats.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).

## Development
Use the `build:dev` [`package.json`](../../package.json) script to create a build for the development environment with webpack. The build process will prioritize options that will shortern build times and make development more convenient. To run the build, use the `start:dev` [`package.json`](../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `start:dev:watch` [`package.json`](../../package.json) script instead to utilize auto-reloading and hot loading.

The `build:dev:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with the Node.js inspector. The `build:dev:stats` [`package.json`](../../package.json) script generates a `stats.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).