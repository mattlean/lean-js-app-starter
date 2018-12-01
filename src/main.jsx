// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { createLogger } from 'redux-logger'

import Root from './containers/Root'
import rootReducer from './reducers'
import { setupStore } from './util/store'
import './main.scss'

const root = document.getElementById('root')

if(root) {
  const store = setupStore(rootReducer, null, [], [createLogger()])
  ReactDOM.render(<Root store={store} />, root)
}
