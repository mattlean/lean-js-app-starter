// @flow

const db = require('./db')
const err = require('./err')
const logger = require('./logger')
const model = require('./model')
const test = require('./test')

const util = {
  db,
  err,
  logger,
  model,
  test
}

module.exports = util
