# JavaScript & TypeScript

## Contents

-   [ECMAScript Version](#ecmascript-version)
-   [TypeScript Version](#typescript-version)
-   [Creating JavaScript, TypeScript, and JSX-Related Files](#creating-javascript-typescript-and-jsx-related-files)

## ECMAScript Version

LJAS allows you to use most of the latest ECMAScript features thanks to [Babel](https://babeljs.io/docs). You can view what features are available in [Babel's docs for `@babel/preset-env`](https://babeljs.io/docs/babel-preset-env).

## TypeScript Version

LJAS currently uses version ~5.3.3. Most of the time we are slightly behind the latest version because we only upgrade to the newest version that [`@typescript-eslint`](https://typescript-eslint.io) supports.

## Creating JavaScript, TypeScript, and JSX-Related Files

All of the application's ECMAScript-related files must exist in the `src/` directory.

If you are using a JavaScript-only starter, these files will commonly have a `.js` file extension.

If you are using a TypeScript starter, you will usually be using files with a `.ts` file extension instead, but JavaScript code under `.js` files is still allowed although it is not recommended.

If your ECMAScript code uses [JSX](https://react.dev/learn/writing-markup-with-jsx), then you will need to add an "x" to the end of the file extension. So for JavaScript that would be `.jsx` and for TypeScript that would be `.tsx`.

We understand it may not be common to require `.jsx` file extensions for code involving JSX, but we thought it made sense to be consistent with [TypeScript's rule that restricts JSX to files with `.tsx` file extensions](https://typescriptlang.org/docs/handbook/jsx.html). If you want to alter that behavior you can go into the ESLint config file, `.eslintrc.js`, and change the [`react/jsx-filename-extension` rule](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md).

## Linting

TODO:

## Type Checking

TODO:

## Formatting

TODO:
