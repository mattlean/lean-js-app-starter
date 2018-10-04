// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import Root from './components/Root'
import configureStore from './util/configureStore'

import './main.scss'

const root = document.getElementById('root')
const store = configureStore()

if(root && store) {
  ReactDOM.render(<Root store={store} />, root)
}
