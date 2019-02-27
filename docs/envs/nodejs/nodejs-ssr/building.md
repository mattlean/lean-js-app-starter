# Node.js + Server-Side Rendering: Building
## Backend
### Production
Use the `back:build` [`package.json`](../../../package.json) script to create a build for the production environment with webpack. This will optimize the build size. To run the build, use the `back:start` [`package.json`](../../../package.json) script with these environment variables:

1. `PORT`: The required port the app is hosted on.
2. `DB_URI`: The required database URI the app connects to.
3. `CLIENT`: An optional client origin the app will grant access to for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Example:  
`PORT=9001 DB_URI=mongodb://username:password@mongodbhost.com:27017 CLIENT=http://appdomain.com npm back:start`

The `back:build:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `back:build:stats` [`package.json`](../../../package.json) script generates a `stats.back.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).

### Development
Use the `back:build:dev` [`package.json`](../../../package.json) script to create a build for the development environment with webpack. The build process will prioritize options that will shortern build times. To run the build, use the `back:start:dev` [`package.json`](../../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `back:ssr:start:dev:watch` [`package.json`](../../../package.json) script instead to utilize auto-reloading and hot loading. Both `start:dev` scripts run the build at [localhost:9001](http://localhost:9001).

The `back:build:dev:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `back:build:dev:stats` [`package.json`](../../../package.json) script generates a `stats.back.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).

## Frontend
### Production
Use the `front:build` [`package.json`](../../../package.json) script to create a build for the production environment with webpack. This will involve everything you need to ensure your app works for all targeted browsers while having an optimized build size. To preview the build, use the `front:start` [`package.json`](../../../package.json) script to host it at [localhost:9090](http://localhost:9090).

The `front:build:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `front:build:stats` [`package.json`](../../../package.json) script generates a `stats.front.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

The production build process generates `records.json` which is used to store module IDs across separate builds. This allows the generation of longer lasting filenames, makes sure that code split parts gain correct caching behavior, and that modules aren't reordered or moved to another chunk during the bundling process which results to less cache invalidations. **This file should checked into version control.**

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).

### Development
Use the `front:build:dev` [`package.json`](../../../package.json) script to create a build for the development environment with webpack. The build process will prioritize options that will shortern build times and make development more convenient. To run the build, use the `front:start:dev` [`package.json`](../../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `front:start:dev:watch` [`package.json`](../../../package.json) script instead to utilize auto-reloading and hot loading. Both `start:dev` scripts will host the build at [localhost:8080](http://localhost:8080).

The `front:build:dev:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `front:build:dev:stats` [`package.json`](../../../package.json) script generates a `stats.front.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).