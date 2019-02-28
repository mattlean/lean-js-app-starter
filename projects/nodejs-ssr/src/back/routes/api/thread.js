import Thread from '../../models/thread'
import { err, model } from '../../util'
import { Router } from 'express'

const { clearReadOnlyProps } = model
const { genErr } = err

const router = Router()

// Create thread
router.post('/', (req, res, next) => {
  req.body = clearReadOnlyProps(req.body)
  if(req.body.replies) delete req.body.replies

  Thread.create(req.body)
    .then(thread => {
      if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        return res.redirect(`/${thread._id}`)
      }
      return res.status(201).json(thread)
    })
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
    .then(thread => {
      if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        return res.redirect(`/${thread._id}`)
      }
      return res.status(201).json(thread)
    })
    .catch(err => next(err))
})

export default router
