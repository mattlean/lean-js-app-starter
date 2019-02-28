// @flow
import React from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'

import Root from './containers/Root'
import rootReducer from './reducers'
import { setupStore } from './util/store'
import './main.scss'

const root = document.getElementById('root')

if(root) {
  const store = setupStore(rootReducer, null, [thunk])
  render(<Root store={store} />, root)
}
