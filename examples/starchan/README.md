# \*chan

\*chan (pronounced as starchan) was first created in 2012 for as a project for [Udacity's Web Application Engineering course (CS253 taught by Steve Huffman)](https://youtube.com/watch?v=CRYn30--PPk). The assignment was to build a [textboard](https://en.wikipedia.org/wiki/Textboard) web application.

It was originally built using [Python](https://python.org), [webapp2](https://cloud.google.com/appengine/docs/legacy/standard/python/tools/webapp2), [Google Cloud Datastore](https://cloud.google.com/datastore), [GQL](https://cloud.google.com/datastore/docs/reference/gql_reference), [Jinja](https://jinja.palletsprojects.com), and plain HTML and CSS, but it was rebuilt in 2018 to use JavaScript, [Flow](https://flow.org), [Node.js](https://nodejs.org), [Express](https://expressjs.com), [MongoDB](https://mongodb.com), [Mongoose](https://mongoosejs.com), [React](https://react.dev), and [Redux](https://redux.js.org). In 2023 it was rebuilt again to utilize [TypeScript](https://typescriptlang.org) instead of JavaScript and Flow, [Prisma](https://prisma.io) instead of Mongoose, [Redux Toolkit](https://redux-toolkit.js.org) instead of traditional Redux.

## Running Tests

TODO: Note that in order to run tests on the backend, you will need to have a build on your machine as the server-side rendering relies on a view generated from the frontend build process in order to work.
