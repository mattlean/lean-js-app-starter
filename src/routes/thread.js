// @flow

const express = require('express')

const Thread = require('../models/thread')
const { genErr } = require('../util').err

const router = express.Router()

router.post('/', (req, res, next) => {
  Thread.create(req.body)
    .then(thread => res.json(thread))
    .catch(err => next(err))
})

router.get('/', (req, res, next) => {
  return Thread.find().exec()
    .then(threads => res.json(threads))
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  return Thread.findById(req.params.id).exec()
    .then(thread => {
      if(!thread) throw genErr(404)

      return res.json(thread)
    })
    .catch(err => next(err))
})

module.exports = router
