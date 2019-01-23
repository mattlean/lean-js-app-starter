// @flow

import logger from './logger'

const test = {
  clearDBCollection(model: string) {
    if(process.env.NODE_ENV === 'test') {
      const Model = require(`../models/${model}`).default

      return Model.remove({})
        .exec()
        .catch(err => logger.error(err))
    }

    throw new Error('Invalid environment')
  }
}

export default test
