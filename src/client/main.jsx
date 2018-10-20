// @flow
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'

import Root from './containers/Root'
import setupStore from './util/setupStore'
import './main.scss'

const root = document.getElementById('root')

if(root) {
  const preloadedState = window.__PRELOADED_STATE__
  delete window.__PRELOADED_STATE__

  const store = setupStore(preloadedState)
  hydrate(
    <Router>
      <Provider store={store}>
        <Root />
      </Provider>
    </Router>,
    root
  )
}
