// @flow

const logger = require('./logger')

const test = {
  clearDBCollection(model: string) {
    const Model = require(`../models/${model}`)

    return Model.remove({})
      .exec()
      .catch(err => logger.error(err))
  }
}

module.exports = test
