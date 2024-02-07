# \*chan

\*chan (pronounced as starchan) is a [textboard](https://en.wikipedia.org/wiki/Textboard) that demonstrates one of [Lean JS App Starter's full-stack project setups](../../starters/react-express-mongo/README.md). It showcases an Express server that acts as a REST API and a React server-side renderer. These work in tandem with a React frontend.

\*chan was first created in 2012 for as a project for [Udacity's Web Application Engineering course (CS253 taught by Steve Huffman)](https://youtube.com/watch?v=CRYn30--PPk). The assignment was to build a [textboard](https://en.wikipedia.org/wiki/Textboard) web application for [ASCII art](https://en.wikipedia.org/wiki/ASCII_art). It was originally built using [Python](https://python.org), [webapp2](https://cloud.google.com/appengine/docs/legacy/standard/python/tools/webapp2), [Google Cloud Datastore](https://cloud.google.com/datastore), [GQL](https://cloud.google.com/datastore/docs/reference/gql_reference), and [Jinja](https://jinja.palletsprojects.com).

In 2018 it was rebuilt using JavaScript, [Flow](https://flow.org), [Node.js](https://nodejs.org), [Express](https://expressjs.com), [MongoDB](https://mongodb.com), [Mongoose](https://mongoosejs.com), [React](https://react.dev), [Redux](https://redux.js.org), and [Sass](https://sass-lang.com). In 2023 it was rebuilt again, except this time using [TypeScript](https://typescriptlang.org) instead of JavaScript and Flow, [Prisma](https://prisma.io) instead of Mongoose, [Redux Toolkit](https://redux-toolkit.js.org) instead of traditional Redux, and plain CSS instead of Sass.

## Running Tests

TODO: Note that in order to run tests on the backend, you will need to have a build on your machine as the server-side rendering relies on a view generated from the frontend build process in order to work.

## Generating Data to Work With

If don't want to manually create threads and replies, you can also use the [`genDevData.ts`](dev-scripts/genDevData.ts) script to generate it for you. For more information on how to use it, read the [Dev Scripts README](dev-scripts/README.md).
