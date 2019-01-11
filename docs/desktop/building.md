# Desktop: Building
## Production
Use the `dist` [`package.json`](../../package.json) script to create a build for the production environment with webpack and electron-builder. This will optimize the build size and generate a desktop application executable. To run the build, navigate to `build/production/electron-builder` and run the executable for your operating system.

The `dist:debug` [`package.json`](../../package.json) script can be used to show more information about the electron-builder process in the terminal.

If you want to only build with webpack, use the `build` [`package.json`](../../package.json) script. To run the build, use the `start` [`package.json`](../../package.json) script.

The `build:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:stats` [`package.json`](../../package.json) script generates a `stats.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).

## Development
Use the `pack` [`package.json`](../../package.json) script to build an unpacked directory with electron-builder.

If you want to only build with webpack, use the `build:dev` [`package.json`](../../package.json) script. The build process will prioritize options that will shortern build times. To run the build, use the `start:dev` [`package.json`](../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `rend:start:dev:watch` and `main:start:dev:watch` [`package.json`](../../package.json) scripts instead to utilize auto-reloading and hot loading.

The `build:dev:debug` [`package.json`](../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:dev:stats` [`package.json`](../../package.json) script generates a `stats.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["webpack Configuration" documentation](configuration.md#webpack).