# Web Browser: Building
## Production
Use the `build` [`package.json`](../../../package.json) script to create a build for the production environment with webpack. This will involve everything you need to ensure your app works for all targeted browsers while having an optimized build size. To preview the build, use the `start` [`package.json`](../../../package.json) script to host it at [localhost:9090](http://localhost:9090).

The `build:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:stats` [`package.json`](../../../package.json) script generates a `stats.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

The production build process generates `records.json` which is used to store module IDs across separate builds. This allows the generation of longer lasting filenames, makes sure that code split parts gain correct caching behavior, and that modules aren't reordered or moved to another chunk during the bundling process which results to less cache invalidations. **This file should checked into version control.**

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).

## Development
Use the `build:dev` [`package.json`](../../../package.json) script to create a build for the development environment with webpack. The build process will prioritize options that will shortern build times and make development more convenient. To run the build, use the `start:dev` [`package.json`](../../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `start:dev:watch` [`package.json`](../../../package.json) script instead to utilize auto-reloading and hot loading. Both `start:dev` scripts will host the build at [localhost:8080](http://localhost:8080).

The `build:dev:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:dev:stats` [`package.json`](../../../package.json) script generates a `stats.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).