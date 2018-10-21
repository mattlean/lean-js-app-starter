# Lean Web App Starter
Rocket launch your next JavaScript application with Lean Web App Starter. The launch pad has already been setup for you, so all you need to do is just download and start coding!

## Overview
### Technologies Used
All environments use these technologies when relevant:

1. Language: JavaScript (ES2015)
2. Type Checking: Flow
3. Testing: Jest
4. JavaScript Compiler: Babel
5. Module Bundler: webpack
6. Node.js App Framework: Express
7. Database: MongoDB
8. Object Modeling: Mongoose
9. UI: React
10. UI State Management: Redux
11. UI Routing: React Router
11. Styling: Sass

### Benefits
- **Don't worry about build configuration**

  Everything you need for your next modern JavaScript app is already ready to go.

- **Modern JavaScript**

  Whether you're coding a browser app or a server API, use modern JavaScript with support for the ECMAScript 2015 specification.

- **Same technology, no matter the environment**

  Both browser and Node.js environments are supported with identical technology stacks and build configuration, making it easy to switch between environments.

- **Hot reloading & automatic development builds**

  No need to refresh or rebuild and run your apps manually during development. Hot loading allows you to tweak your React components in real-time, and automatic building quickly rebuilds your Node.js application for you any time your codebase changes.

- **Server-side rendering**

  Render React components on the server and neatly integrate your browser and Node.js codebases together.

- **Optimized production builds**

  Build for production with one simple command that handles all of the optimization for you.

- **Fully customizable**

  If you ever need to change the build configuration, you can easily do so. There is no need to eject anything. The config source is accessible, pretty barebones, and documented making it easy to customize.

### Environments
#### Browser
##### Download
If you're looking to build an app for a web browser, you can start with the *latest `browser` release*.

#### Examples
You can find some example browser apps in the following branches:

- [`todolist-frontend`](https://github.com/IsaacLean/lean-web-app-starter/tree/todolist-frontend): A todo list app. Connects with mock backend API and can be run standalone.
- [`starchan-frontend`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-frontend): An anonymous text board called *chan (pronounced star-chan). Requires connection with backend API on [`starchan-backend`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-backend).

[Click here for documentation on building browser apps with Lean Web App Starter.](docs/browser/README.md)

#### Node.js
##### Downloads
If you're looking to build a Node.js app like a web server, you have two options:

- *`nodejs`*: A simple Express, MongoDB, and Mongoose app starter project
- *`nodejs-ssr`*: An Express, MongoDB, and Mongoose app that supports server-side rendering of React components

##### Examples
You can find example Node.js apps in the following branches:

- [`starchan-backend`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-backend): An API for an anonymous text board. Optionally connects with the *chan browser app on [`starchan-frontend`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-frontend).
- [`starchan-ssr`](https://github.com/IsaacLean/lean-web-app-starter/tree/starchan-ssr): A version of the *chan backend app that supports server-side rendering of React components. Can be run standalone.

[Click here for documentation on building Node.js apps with Lean Web App Starter.](docs/nodejs/README.md)

## License
This open source project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).