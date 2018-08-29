// @flow

const express = require('express')
const app = express()

const logger = require('./logger')

app.get('/', (req, res) => res.send('Hello world!'))

app.listen(3000, () => logger.info({message: 'Server listening on port 3000!'}))
