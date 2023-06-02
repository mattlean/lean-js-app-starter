# Basic Node.js Starter Project (JavaScript)

This is a starter for a [Node.js](https://nodejs.org) project that provides a very lightweight, minimal configuration.

Note that this uses JavaScript. If you want the TypeScript equivalent to this, use the [basic-nodejs-ts](../basic-nodejs-ts) project instead.

## Getting Started

### Standard Method

The only prerequisite is that you must have [Node.js](https://nodejs.org) installed. Note that this was tested on Node.js v18.16.0, but many other Node.js versions should still work.

Once Node.js is installed, install the project dependencies with the following command:

```
npm install
```

Finally, you can start the development server with following command:

```
npm run dev
```

### Docker Development Environment

Alternatively, you can also run the Docker development environment which only requires an installation of [Docker](https://www.docker.com). Note that this was tested on Docker Desktop 4.20.0, but many other Docker installations should work.

Then all you need to do is run the following command to start the development server:

```
docker compose up
```

## Technologies

-   [Docker](https://www.docker.com): This is used for an optional development environment available for you to use if you want consistency across different machines.
