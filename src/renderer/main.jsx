// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'
import setupStore from './util/setupStore'

const root = document.getElementById('root')
const store = setupStore()

if(root && store) {
  ReactDOM.render(<Root store={store} />, root)
}
