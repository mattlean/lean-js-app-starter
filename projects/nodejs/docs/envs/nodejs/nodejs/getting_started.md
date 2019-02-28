# Node.js: Getting Started
## 0. Prerequisites
You must have [Node.js](https://nodejs.org), [MongoDB](https://mongodb.com), and [npm](https://npmjs.com) or [Yarn](https://yarnpkg.com).

* Download Node.js and npm here: https://nodejs.org/en/download
* If you don't want to use npm, download Yarn here: https://yarnpkg.com/en/docs/install
* Download MongoDB here: https://mongodb.com/download-center/community

If you need a guide on installing MongoDB, read the [MongoDB Community Edition tutorials](https://docs.mongodb.com/manual/installation/#mongodb-community-edition).

## 1. Download
Download and extract the latest `nodejs` release here: https://github.com/IsaacLean/lean-js-app-starter/releases

## 2. Setup
Open a terminal, go to the project root directory, and then run one of the following [`package.json`](../../../../package.json) scripts to install dependencies and [Flow](https://flow.org) library interface definitions:

* npm: `npm run setup`
* Yarn: `yarn run setup`

If you don't want to use Flow and just want to install dependencies, you can run the default commands:

* npm: `npm install` or `npm i`
* Yarn: `yarn` or `yarn install`

If you want to just install Flow library interface definitions, you can run:

* npm: `npm run flow-typed install`
* Yarn: `npm run flow-typed install`

## 3. Start Developing
🎉 Ta-da! You can start coding! To learn more about how to make the most of your development environment, read the ["Developing" documentation](developing.md).