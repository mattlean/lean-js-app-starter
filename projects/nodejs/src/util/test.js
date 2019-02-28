// @flow

const logger = require('./logger')

const test = {
  clearDBCollection(model: string) {
    if(process.env.NODE_ENV === 'test') {
      const Model = require(`../models/${model}`)

      return Model.remove({})
        .exec()
        .catch(err => logger.error(err))
    }

    throw new Error('Invalid environment')
  }
}

module.exports = test
