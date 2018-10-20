import React from 'react'
import { normalize } from 'normalizr'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { Router } from 'express'
import { StaticRouter } from 'react-router-dom'

import clientAssets from '../../../build/client/assets'
import Root from '../../client/containers/Root'
import Thread from '../models/thread'
import { err, model } from '../util'
import { setupStore } from '../../client/util/store'
import { Thread as ThreadSchema, Threads } from '../../client/types/schema'

const { docToObject } = model
const { genErr } = err

const router = Router()

const genHTML = (store, location, context = {}) => renderToString(
  <Provider store={store}>
    <StaticRouter location={location} context={context}>
      <Root />
    </StaticRouter>
  </Provider>
)

const renderFullPage = (html, preloadedState) => {
  if(preloadedState) {
    preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    preloadedState = `<script>window.__PRELOADED_STATE__ = ${preloadedState}</script>`
  } else {
    preloadedState = ''
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>*chan</title>
        <link href="/static/${clientAssets.style.filename}" rel="stylesheet">
      </head>
      <body>
        <div id="root">${html}</div>
        ${preloadedState}
        <script type="text/javascript" src="/static/${clientAssets.manifest[0].filename}"></script>
        <script type="text/javascript" src="/static/${clientAssets.vendor[0].filename}"></script>
        <script type="text/javascript" src="/static/${clientAssets.main[0].filename}"></script>
      </body>
    </html>
  `
}

router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  Thread.find().sort({ createdAt: -1 }).exec()
    .then(threads => {
      const store = setupStore()
      store.dispatch({
        type: 'FETCH_THREADS_SUCCESS',
        res: normalize(docToObject(threads), Threads)
      })

      res.send(renderFullPage(genHTML(store, req.url), store.getState()))
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  Thread.findById(req.params.id).exec()
    .then(thread => {
      if(!thread) throw genErr(404)

      const store = setupStore()
      store.dispatch({
        type: 'FETCH_THREAD_SUCCESS',
        res: normalize(thread.toObject(), ThreadSchema)
      })

      res.send(renderFullPage(genHTML(store, req.url), store.getState()))
    })
    .catch(err => next(err))
})

export default router
