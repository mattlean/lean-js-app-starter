# Frequently asked questions

### How do I remove all mentions of Lean JS App Starter from my project?

Search the code for strings that are the title of the starter project name prefixed with `ljas-`. There shouldn't be many of them to replace.

For example, if you're using the `react-browser` project, you would search and replace for `ljas-react-browser`. This would replace the `package.json` `name` field and the title option in the webpack configuration used as the contents of the `<title>` tag in the HTML template.

Then the final thing you need to do is clear contents of the `README.md` file and you'll be good to go.

### Why are ECMAScript modules used for Node.js projects over CommonJS modules?

Because ECMAScript modules are used for the frontend projects, we've decided to maintain consistency and use them for the Node.js projects as well. One exception to this is for some configuration code where CommonJS modules are used by default.

### Why is JSX only allowed in files with `.jsx` extensions?

This is to remain consistent with the TypeScript projects where the language requires JSX to be in files with `.tsx` extensions.

### Why use Babel over the official TypeScript compiler?

We use Babel to compile TypeScript because we already use it to handle syntax transforms, browser polyfills, and React. To keep performance, we move type checking to a separate process using [Fork TS Checker Webpack Plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin).

### Why do you still use webpack for Node.js projects?

We do this to maintain consistency with all of the other projects, mainly with the Node.js projects using TypeScript, and we're avoiding some quirks Node.js has with ECMAScript modules and imports.

Although Node.js does have very good support for modern ECMAScript standards, some of the developer experience slightly varies from the standard experience offered by codebases that utilize TypeScript or webpack. For example, [Node.js requires file extensions in `import` declarations because of its stricter implementation of the ECMAScript 2015 specification](https://nodejs.org/api/esm.html#mandatory-file-extensions), whereas TypeScript and webpack have opted to handle imports with a more lenient approach that guesses file extensions similarly to CommonJS `require` function calls. Without webpack, we could rely on the `experimental-specifier-resolution` flag, but [Node.js recommends against this since it is planned to be removed](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm).

There are a few other quirks that come along with ECMAScript modules and Node.js too. For example, in order to use them you must utilize them in `.mjs` files or
set the `type` field in `package.json` to `"module"` which introduces its own complications around configuration and the developer experience. Using webpack allows us to avoid all of these issues while introducing some useful tools that Node.js lacks out-of-the-box.