// @flow
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import App from '../components/App'
import type { State, Action, Dispatch } from '../types'

const Root = ({ store }: { store: Store<State, Action, Dispatch> }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
)

export default hot(module)(Root)
