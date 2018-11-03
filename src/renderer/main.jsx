// @flow
import React from 'react'
import { render } from 'react-dom'

import Root from './containers/Root'
import setupStore from './util/setupStore'

const root = document.getElementById('root')

const store = setupStore()

if(root) {
  render(<Root store={store} />, root)
}
