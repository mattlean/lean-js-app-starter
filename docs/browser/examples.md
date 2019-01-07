# Web Browser: Examples
**Before running these examples, you must first you run the `setup` [`package.json`](../../package.json) script.**

## Basic Redux & React Router Example
An example app that showcases a basic Redux implementation of a React counter along with routing with React Router. Available by default with the [`browser` release].

To try the app, run the `start:dev:watch` [`package.json`](../../package.json) script and navigate to [localhost:8080](http://localhost:8080) in a browser.

* Download: [URL]
* Branch: https://github.com/IsaacLean/lean-js-app-starter/tree/browser

## Todo List
A todo list app. Connects with mock backend API.

To try the app, run the `start:dev:watch` [`package.json`](../../package.json) script and navigate to [localhost:8080](http://localhost:8080) in a browser.

* Download: [URL]
* Branch: https://github.com/IsaacLean/lean-js-app-starter/tree/todolist-browser

## *chan: Anonymous Text Board
The frontend app for an anonymous text board called *chan (pronounced star-chan). Requires connection with the [*chan backend API] which is a [Node.js example].

To try the app you must first [setup the backend API]. Once that is done, follow these steps:
1. Open a terminal and run [`mongod`](https://docs.mongodb.com/manual/reference/program/mongod).
2. After `mongod` is running, open another terminal and run the backend API with the `start:dev:watch` [`package.json`](../../package.json) script.
3. After the backend API is running, in yet another terminal window run the frontend app with the `start:dev:watch` script.
4. Navigate to [localhost:8080](http://localhost:8080) in a browser.

* Download: [URL]
* Branch: https://github.com/IsaacLean/lean-js-app-starter/tree/starchan-frontend