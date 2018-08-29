// @flow
const moment = require('moment')
const { createLogger, format, transports } = require('winston')

const { printf } = format

const customFormat = printf(info => `<${moment().format('YYYY-MM-DD HH:MM:SS')}> [${info.level}]: ${info.message}`)

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [ new transports.Console() ]
})

module.exports = logger
