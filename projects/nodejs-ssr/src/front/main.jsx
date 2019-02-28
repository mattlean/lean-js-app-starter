// @flow
import React from 'react'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'

import Root from './containers/Root'
import rootReducer from './reducers'
import { setupStore } from './util/store'
import './main.scss'

const root = document.getElementById('root')

if(root) {
  const preloadedState = window.__PRELOADED_STATE__

  const store = setupStore(rootReducer, preloadedState, [thunk])
  hydrate(
    <Router>
      <Provider store={store}>
        <Root />
      </Provider>
    </Router>,
    root
  )
}
