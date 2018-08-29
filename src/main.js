// @flow

const express = require('express')
const helmet = require('helmet')

const logger = require('./logger')

const app = express()

app.use(helmet())

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(3000, () => logger.info({message: 'Server listening on port 3000!'}))
