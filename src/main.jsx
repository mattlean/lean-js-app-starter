// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './containers/Root'
import { setupStore } from './util/store'
import './main.scss'

const root = document.getElementById('root')

if(root) {
  const store = setupStore()
  ReactDOM.render(<Root store={store} />, root)
}
