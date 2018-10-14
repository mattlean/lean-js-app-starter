// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'
import configureStore from './util/configureStore'

const root = document.getElementById('root')
const store = configureStore()

if(root && store) {
  ReactDOM.render(<Root store={store} />, root)
}
