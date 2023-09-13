# Adding Support for Sass

The frontend starter projects only support CSS by default since that is the fundamental stylesheet language, but it doesn't take much to setup Sass.

Install [Sass](https://github.com/sass/dart-sass) and [sass-loader](https://webpack.js.org/loaders/sass-loader) with the following command:

```
npm install sass@~1.64.2 sass-loader@^13.3.2
```

Next you will need to replace the [ljas-webpack](https://npmjs.com/package/ljas-webpack) CSS parts in the frontend webpack configuration with the equivalent Sass parts.

So, for example, in a frontend webpack development config file, you'd replace `injectCss` with `injectSass`. Then in a frontend webpack production config file, you'd replace `buildPrefixedCss` with `buildPrefixedSass`.

Finally, the last thing to do is configure [Stylelint](https://stylelint.io) to cover `.scss` files. Install the standard Stylelint SCSS config with the following command:

```
npm install stylelint-config-standard-scss@^11.0.0 --save-dev
```

Then update `.stylelintrc.json` to include `stylelint-config-standard-scss` in the `extends` property like so:

```
{ "extends": ["stylelint-config-standard-scss"] }
```

And that's it! You should be able to handle `.sass` and `.scss` files in your JavaScript or TypeScript code now.

You can find an example of Sass being configured for the [Counter](../examples/counter) example project.
