# Lean Web App Starter
Rocket launch your next JavaScript application with Lean Web App Starter. The build configuration is already done, so all you need to do is just choose an environment, download, and start coding!

Both browser and Node.js environments are supported. If you ever need to switch environments, you can do so comfortably as the build configuration and dependencies between all environments are basically identical.

If you ever need customize the build configuration you can easily do so as the project is completely transparent and the webpack config is pretty barebones.

## Overview
### Technologies Used
All environments use these technologies when relevant:

1. Language: JavaScript (ES2015)
2. Type Checking: Flow
3. Testing: Jest
4. JavaScript Compiler: Babel
5. Module Bundler: webpack
6. Node.js Application Framework: Express
7. Database: MongoDB
8. Object Modeling: Mongoose
9. UI Library: React
10. UI State Management Library: Redux
11. Styling: Sass

### Environments
#### Browser
##### Download
If you're looking to build an app for a web browser, you can start with the *latest `browser` release*.

#### Examples
You can find some example browser apps in the following branches:

- *`todolist-frontend`*: A todo list app. Connects with mock backend API and can be run standalone.
- *`starchan-frontend`*: An anonymous text board called *chan (pronounced star-chan). Requires connection with backend API on *`starchan-backend`*.

[Click here for documentation on building browser apps with Lean Web App Starter.](docs/browser/README.md)

#### Node.js
##### Downloads
If you're looking to build a Node.js app like a web server, you have two options:

- *`nodejs`*: A simple Express, MongoDB, and Mongoose app starter project
- *`nodejs-ssr`*: An Express, MongoDB, and Mongoose app that supports server-side rendering of React components

##### Examples
You can find example Node.js apps in the following branches:

- *`starchan-backend`*: An API for an anonymous text board. Optionally connects with the *chan browser app on *`starchan-frontend`*.
- *`starchan-ssr`*: A version of the *chan backend app that supports server-side rendering of React components. Can be run standalone.

[Click here for documentation on building Node.js apps with Lean Web App Starter.](docs/nodejs/README.md)

## License
This open source project is licensed under the [MIT License](https://choosealicense.com/licenses/mit).