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
import { genTitle } from '../../client/util'
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

const renderFullPage = (html, preloadedState, title = '*chan') => {
  if(preloadedState) {
    preloadedState = JSON.stringify(preloadedState).replace(/</g, '\\u003c')
    preloadedState = `<script>window.__PRELOADED_STATE__ = ${preloadedState}</script>`
  } else {
    preloadedState = ''
  }

  let manifest = ''
  if(clientAssets.manifest) {
    if(Array.isArray(clientAssets.manifest)) {
      manifest = `<script type="text/javascript" src="/static/${clientAssets.manifest[0].filename}"></script>`
    } else {
      manifest = `<script type="text/javascript" src="/static/${clientAssets.manifest.filename}"></script>`
    }
  }

  let vendor = ''
  if(clientAssets.vendor) {
    if(Array.isArray(clientAssets.vendor)) {
      vendor = `<script type="text/javascript" src="/static/${clientAssets.vendor[0].filename}"></script>`
    } else {
      vendor = `<script type="text/javascript" src="/static/${clientAssets.vendor.filename}"></script>`
    }
  }

  let main = ''
  if(clientAssets.main) {
    if(Array.isArray(clientAssets.main)) {
      main = `<script type="text/javascript" src="/static/${clientAssets.main[0].filename}"></script>`
    } else {
      main = `<script type="text/javascript" src="/static/${clientAssets.main.filename}"></script>`
    }
  }

  let style = ''
  if(clientAssets.style) {
    if(Array.isArray(clientAssets.style)) {
      style = `<link href="/static/${clientAssets.style[0].filename}" rel="stylesheet">`
    } else {
      style = `<link href="/static/${clientAssets.style.filename}" rel="stylesheet">`
    }
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        ${style}
      </head>
      <body>
        <div id="root">${html}</div>
        ${preloadedState}
        ${manifest}
        ${vendor}
        ${main}
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

      res.send(renderFullPage(genHTML(store, req.url), store.getState(), genTitle()))
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  Thread.findById(req.params.id).exec()
    .then(thread => {
      if(!thread) throw genErr(404)

      thread = thread.toObject()

      const store = setupStore()
      store.dispatch({
        type: 'FETCH_THREAD_SUCCESS',
        res: normalize(thread, ThreadSchema)
      })

      const title = thread.subject || `Thread ${thread._id}`
      res.send(renderFullPage(genHTML(store, req.url), store.getState(), genTitle(title)))
    })
    .catch(err => next(err))
})

export default router
