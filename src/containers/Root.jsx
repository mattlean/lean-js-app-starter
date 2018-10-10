// @flow
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import NotFound from '../components/NotFound'
import Page from '../components/Page'
import ThreadList from '../containers/ThreadList'
import type { Action, Dispatch, State } from '../types'

const App = ({ store }: { store: Store<State, Action, Dispatch> }) => {
  return <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={() => (
          <Page>
            <ThreadList />
          </Page>
        )} />
        <Route exact path="/new" component={() => (
          <Page>
            <div>
              New Page
            </div>
          </Page>
        )} />
        <Route component={() => (
          <Page>
            <NotFound />
          </Page>
        )} />
      </Switch>
    </Router>
  </Provider>
}

export default hot(module)(App)
