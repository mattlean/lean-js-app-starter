# Node.js: Building
## Production
Use the `build` [`package.json`](../../../package.json) script to create a build for the production environment with webpack. This will optimize the build size. To run the build, use the `start` [`package.json`](../../../package.json) script with these environment variables:

1. `PORT`: The required port the app is hosted on.
2. `DB_URI`: The required database URI the app connects to.
3. `CLIENT`: An optional client origin the app will grant access to for [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

Example:  
`PORT=9001 DB_URI=mongodb://username:password@mongodbhost.com:27017 CLIENT=http://appdomain.com npm start`

The `build:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:stats` [`package.json`](../../../package.json) script generates a `stats.production.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).

## Development
Use the `build:dev` [`package.json`](../../../package.json) script to create a build for the development environment with webpack. The build process will prioritize options that will shortern build times. To run the build, use the `start:dev` [`package.json`](../../../package.json) script. Although you can use this for development, it is highly recommended you avoid these two scripts and regularly use the `start:dev:watch` [`package.json`](../../../package.json) script instead to utilize auto-reloading and hot loading. Both `start:dev` scripts run the build at [localhost:9001](http://localhost:9001).

The `build:dev:debug` [`package.json`](../../../package.json) script can be used to debug the webpack configuration with a [Node.js inspector client](https://nodejs.org/en/docs/guides/debugging-getting-started/#inspector-clients). The `build:dev:stats` [`package.json`](../../../package.json) script generates a `stats.development.json` file in the project root directory which can be used with many analysis tools such as [analyse](https://github.com/webpack/analyse).

For more details on what the webpack build process is doing, read the ["Configuration: webpack" documentation](configuration.md#webpack).