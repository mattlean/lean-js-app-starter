// @flow

require('source-map-support').install()

const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')

const { logger } = require('./util')
const routeThread = require('./routes/thread')

const app = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())

// logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.path}`)
    next()
  })
}

app.get('/', (req, res) => res.send('Hello world!'))

app.use('/thread', routeThread)

// 404
app.use((req, res, next) => res.status(404).send('404 Not Found')) // eslint-disable-line no-unused-vars

// error handler
app.use((err, req, res, next) => {  // eslint-disable-line no-unused-vars
  logger.error(err.stack)

  const status = err.status || 500

  let message
  if(status === 500) {
    message = 'Something broke! :('
  } else {
    message = err.message
  }

  res.status(status).send(message)
})

module.exports = app
