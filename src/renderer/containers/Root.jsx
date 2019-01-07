// @flow
import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Dispatch, Store } from 'redux'

import CounterContainer from './CounterContainer'
import Home from '../components/Home'
import NoMatch from '../components/NoMatch'
import type { Action, State } from '../types'

const Root = ({ store }: { store: Store<State, Action, Dispatch<Action>> }) => {
  return <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/counter" component={CounterContainer} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </Provider>
}

export default hot(module)(Root)
