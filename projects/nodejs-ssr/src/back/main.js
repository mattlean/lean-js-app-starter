// @flow

import app from './app'
import { db, logger } from './util'
import { DB_URI, PORT } from './config'

if(process.env.NODE_ENV) {
  logger.info(`Environment: ${process.env.NODE_ENV}`)
} else {
  logger.warn('Environment: undefined')
}

db.connect(DB_URI)
  .then(() => {
    app.listen(PORT, () => logger.info(`Server listening on port ${PORT}!`))
  })
  .catch(err => logger.error(err))
