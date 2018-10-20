// @flow

import logger from './logger'

const test = {
  clearDBCollection(model: string) {
    const Model = require(`../models/${model}`).default

    return Model.remove({})
      .exec()
      .catch(err => logger.error(err))
  }
}

export default test
