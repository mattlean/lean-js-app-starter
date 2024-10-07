# ljas-webpack

[![npm](https://img.shields.io/npm/v/ljas-webpack.svg?colorB=brightgreen)](https://npmjs.com/package/ljas-webpack) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mattlean/lean-js-app-starter/blob/master/ljas-webpack/LICENSE)

`ljas-webpack` is a library of [webpack](https://webpack.js.org) configuration parts. It was originally built for **[Lean JS App Starter (LJAS)](https://github.com/mattlean/lean-js-app-starter)**, but you may find it useful for your own webpack configurations.

## Installation

`npm install --save-dev ljas-webpack`

## ljas-webpack vs. Conventional webpack Configuration

When you compare a webpack config file written with `ljas-webpack` to an equivalent conventional one (like one you'd see in the [webpack docs' "Getting Started" guide](https://webpack.js.org/guides/getting-started/#using-a-configuration)), you'll find that `ljas-webpack` drastically reduces clutter and makes the config code easier to understand at a high-level.

You can see this comparison yourself with a [basic example that we have available for you to check out](./examples/basic-example).

## Usage

Although it's not required, we highly recommend using this library with [`webpack-merge`](https://npmjs.com/package/webpack-merge) as it will make it easier to compose webpack composition parts together.

If you're unfamiliar with using `webpack-merge`, we highly recommended reading the ["Composing Configuration" chapter from the SurviveJS webpack book](https://survivejs.com/webpack/developing/composing-configuration), a free book by one of the founders of the webpack core team, [Juho Vepsäläinen](https://survivejs.com/about-me). This resource was actually the catalyst for this library.

You can also get an idea of how `webpack-merge` works by reading over its usage in the [webpack docs' "Production" guide](https://webpack.js.org/guides/production). It doesn't go over the concept of a configuration parts like SurviveJS does, but it does use `webpack-merge` to split the webpack config across separate files to improve maintainability.

The root of this repository will have various `.js` files that export functions available for you to import into your own webpack configs. Each function exported from these files will have a [JSDoc](https://jsdoc.app) comment that explains what it does and what packages it relies on.

You can find simple examples of webpack configs for various scenarios written with `ljas-webpack` in the [`examples/`](./examples) directory.

For more complicated examples, check out Lean JS App Starter's [examples](https://github.com/mattlean/lean-js-app-starter/tree/master/examples) and [starter projects](https://github.com/mattlean/lean-js-app-starter/tree/master/starters).

## License

`ljas-webpack` is open source software [licensed as MIT](https://github.com/mattlean/lean-js-app-starter/blob/master/ljas-webpack/LICENSE).
