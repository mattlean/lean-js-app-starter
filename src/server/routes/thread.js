const express = require('express')

const Thread = require('../models/thread')
const { genErr } = require('../util').err
const { clearReadOnlyProps } = require('../util').model

const router = express.Router()

// Create thread
router.post('/', (req, res, next) => {
  req.body = clearReadOnlyProps(req.body)
  if(req.body.replies) delete req.body.replies

  Thread.create(req.body)
    .then(thread => res.json(thread))
    .catch(err => next(err))
})

// List threads
router.get('/', (req, res, next) => {
  Thread.find().sort({ createdAt: -1 }).exec()
    .then(threads => res.json(threads))
    .catch(err => next(err))
})

// Read thread
router.get('/:id', (req, res, next) => {
  Thread.findById(req.params.id).exec()
    .then(thread => {
      if(!thread) throw genErr(404)

      return res.json(thread)
    })
    .catch(err => next(err))
})

// Create reply
router.post('/:id/reply', (req, res, next) => {
  req.body = clearReadOnlyProps(req.body)

  Thread.findById(req.params.id).exec()
    .then(thread => {
      if(!thread) throw genErr(404)

      thread.replies.push({comment: req.body.comment})

      return thread.save()
    })
    .then(thread => res.json(thread))
    .catch(err => next(err))
})

module.exports = router
