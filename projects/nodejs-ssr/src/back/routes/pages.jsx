import React from 'react'
import thunk from 'redux-thunk'
import { normalize } from 'normalizr'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { Router } from 'express'
import { StaticRouter } from 'react-router-dom'

import Root from '../../front/containers/Root'
import rootReducer from '../../front/reducers'
import Thread from '../models/thread'
import { err, model } from '../util'
import { genTitle } from '../../front/util'
import { setupStore } from '../../front/util/store'
import { Thread as ThreadSchema, Threads } from '../../front/types/schema'

let frontAssets
if(process.env.NODE_ENV === 'development') {
  frontAssets = require('../../../build/front/development/assets')
} else {
  frontAssets = require('../../../build/front/production/assets')
}

const { docArrayToJSON } = model
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

  let main = ''
  let manifest = ''
  let style = ''
  let vendor = ''

  if(process.env.NODE_ENV === 'development') {
    if(frontAssets.main) {
      main = `<script type="text/javascript" src="/static/${frontAssets.main.filename}"></script>`
    }
  } else {
    if(frontAssets.manifest) {
      if(Array.isArray(frontAssets.manifest)) {
        manifest = `<script type="text/javascript" src="/static/${frontAssets.manifest[0].filename}"></script>`
      } else {
        manifest = `<script type="text/javascript" src="/static/${frontAssets.manifest.filename}"></script>`
      }
    }

    if(frontAssets.vendor) {
      if(Array.isArray(frontAssets.vendor)) {
        vendor = `<script type="text/javascript" src="/static/${frontAssets.vendor[0].filename}"></script>`
      } else {
        vendor = `<script type="text/javascript" src="/static/${frontAssets.vendor.filename}"></script>`
      }
    }

    if(frontAssets.main) {
      if(Array.isArray(frontAssets.main)) {
        for(let i=0; i < frontAssets.main.length; ++i) {
          if(main && style) break

          const currAsset = frontAssets.main[i]

          if(currAsset.type === 'js') {
            main = `<script type="text/javascript" src="/static/${currAsset.filename}"></script>`
            continue
          }

          if(currAsset.type === 'css') {
            style = `<link href="/static/${currAsset.filename}" rel="stylesheet">`
          }
        }
      } else if(frontAssets.main === 'js') {
        main = `<script type="text/javascript" src="/static/${frontAssets.main.filename}"></script>`
      }
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
      const store = setupStore(rootReducer, null, [thunk])
      store.dispatch({
        type: 'FETCH_THREADS_SUCCESS',
        res: normalize(docArrayToJSON(threads), Threads)
      })

      res.send(renderFullPage(genHTML(store, req.url), store.getState(), genTitle()))
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  if(req.params.id === 'favicon.ico') {
    next()
  } else {
    Thread.findById(req.params.id).exec()
      .then(thread => {
        if(!thread) throw genErr(404)

        thread = thread.toJSON()

        const store = setupStore(rootReducer, null, [thunk])
        store.dispatch({
          type: 'FETCH_THREAD_SUCCESS',
          res: normalize(thread, ThreadSchema)
        })

        const title = thread.subject || `Thread ${thread._id}`
        res.send(renderFullPage(genHTML(store, req.url), store.getState(), genTitle(title)))
      })
      .catch(err => next(err))
  }
})

export default router
