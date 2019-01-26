# Lean JavaScript Application Starter
Skip boilerplate setup and get straight to the code you care about for your next JavaScript application.

## Overview
### 🚀 Simple Setup
Follow a few simple steps in the ["Getting Started" documentation](docs/getting_started.md) and get straight to coding!

### 🌙 Consistent Codebase Across Multiple Environments
Consistent JavaScript standard, dependencies, and configuration no matter what environment you're building for.

| 🏄‍ Web Browser                                          | 🌐 Node.js                                              | 🖥️ Desktop                                              |
|--------------------------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| [JavaScript (ES2015)](docs/javascript_features.md)     | [JavaScript (ES2015)](docs/javascript_features.md)     | [JavaScript (ES2015)](docs/javascript_features.md)     |
| [Babel](https://babeljs.io)                            | [Babel](https://babeljs.io)                            | [Babel](https://babeljs.io)                            |
| [Flow](https://flow.org)                               | [Flow](https://flow.org)                               | [Flow](https://flow.org)                               |
| [Jest](https://jestjs.io)                              | [Jest](https://jestjs.io)                              | [Jest](https://jestjs.io)                              |
| [webpack](https://webpack.js.org)                      | [webpack](https://webpack.js.org)                      | [webpack](https://webpack.js.org)                      |
| [React](https://reactjs.org)                           | [React](https://reactjs.org)                           | [React](https://reactjs.org)                           |
| [Redux](https://redux.js.org)                          | [Redux](https://redux.js.org)                          | [Redux](https://redux.js.org)                          |
| [React Router](https://reacttraining.com/react-router) | [React Router](https://reacttraining.com/react-router) | [React Router](https://reacttraining.com/react-router) |
| [Sass](https://sass-lang.com)                          | [Sass](https://sass-lang.com)                          | [Sass](https://sass-lang.com)                          |
|                                                        | [Node.js](https://nodejs.org)                          | [Electron](https://electronjs.org)                     |
|                                                        | [Express](https://expressjs.com)                       |                                                        |
|                                                        | [MongoDB](https://mongodb.com)                         |                                                        |
|                                                        | [Mongoose](https://mongoosejs.com)                     |                                                        |

Future support for more environments and libraries are being considered.

### 👩‍💻 Helpful Features for Development
#### Useful Tooling
Plugins, source maps, scripts, and tool integrations like Redux DevTools, Devtron, and many others are already setup for you to make debugging easier.

Optionally use Flow, ESLint, and stylelint to help identify potential problems and produce better, safer code.

#### Automatic Reloading & Hot Loading
No need to manually refresh, rebuild, and rerun your apps during development. Let a script automate all of that for you so you can see your changes as soon as possible. When coding with React, take advantage of hot loading so you can tweak components in real-time without refreshing and losing state.

#### Server-Side Rendering Support
Render React components on the server and neatly integrate your browser and Node.js codebases together.

### 🏛️ Build For Production
Create a production ready build with one simple command. Minification and exclusion of unused code are all handled for you. Only the necessary JavaScript transformations/polyfills and CSS vendor prefixes for targeted browser versions are included. This ensures the build works everywhere you need while being the smallest size possible.

### 🔧 Fully Customizable
If you ever need to change the configuration for anything, you can easily do so. The starting codebases are small, documented, easy to understand, and ready to adjust to all of your needs.

## Get Started
### 🏄‍ Web Browser
#### Download
If you want to build an app for web browsers, start with the [latest `browser` release](https://github.com/IsaacLean/lean-web-app-starter/releases).

#### Examples
You can find some example browser apps in the following branches:

- [`todolist-browser`](https://github.com/IsaacLean/lean-web-app-starter/tree/todolist-browser): A todo list app. Connects with mock backend API.
- [`starchan-frontend`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-frontend): The frontend app for an anonymous text board called *chan (pronounced star-chan). Requires connection with the *chan backend API on the [`nodejs` branch](https://github.com/IsaacLean/lean-web-app-starter/tree/nodejs).

[Click here for documentation on building browser apps.](docs/envs/browser/README.md)

### 🌐 Node.js
#### Downloads
If you want to build an app for Node.js, start with the [latest `nodejs` release](https://github.com/IsaacLean/lean-web-app-starter/releases).

#### Examples
You can find an example Node.js app in the following branch:

- [`nodejs`](https://github.com/IsaacLean/lean-web-app-starter/tree/nodejs): A REST API for an anonymous text board called *chan (pronounced star-chan). Optionally connects with the *chan frontend app on the [`starchan-frontend` branch](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-frontend).

[Click here for documentation on building Node.js apps.](docs/envs/nodejs/README.md)

### 🖥️ Desktop
#### Download
If you want to build an app for desktop, start with the [latest `desktop` release](https://github.com/IsaacLean/lean-js-app-starter/releases).

#### Examples
You can find an example desktop app in the following branch:

- [`todolist-desktop`](https://github.com/IsaacLean/lean-web-app-starter/tree/todolist-desktop): A todo list app ported from the browser targeted app on the [`todolist-browser` branch](https://github.com/IsaacLean/lean-web-app-starter/tree/todolist-browser).

[Click here for documentation on building desktop apps.](docs/envs/desktop/README.md)

### 🏊 Documentation
You can dive deeper into the project by reading the [documentation](docs/README.md) which is also included locally with each copy of the project in the [`docs/`](docs) folder.

## License
This open source project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).