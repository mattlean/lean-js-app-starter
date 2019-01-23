import bodyParser from 'body-parser'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import 'source-map-support/register'

import routePages from './routes/pages'
import routeAPI from './routes/api'
import { CLIENT } from './config'
import { logger } from './util'

const app = express()

app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// logging middleware
if(process.env.NODE_ENV === 'development') {
  app.use('/static', express.static('build/front/development'))

  app.use((req, res, next) => {
    logger.debug(`${req.method} ${req.path}`)
    next()
  })
} else {
  app.use('/static', express.static('build/front/production'))
}

// CORS setup
if(CLIENT) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CLIENT)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'POST,PUT')
      return res.status(200).json({})
    }
    next()
  })
}

app.use('/api', routeAPI)

app.use('/', routePages)

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

export default app
