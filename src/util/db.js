// @flow

const mongoose = require('mongoose')

const logger = require('./logger')

const db = {
  connect(uri: string, successMsg: string = 'Connected to MongoDB') {
    return mongoose.connect(uri, { useNewUrlParser: true })
      .then(() => {
        logger.info(successMsg)
        return successMsg
      })
      .catch(err => logger.error(err))
  },

  disconnect(successMsg: string = 'Disconnected from MongoDB') {
    return mongoose.disconnect()
      .then(() => {
        logger.info(successMsg)
        return successMsg
      })
      .catch(err => logger.error(err))
  }
}

module.exports = db
