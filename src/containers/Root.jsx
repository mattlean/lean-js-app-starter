// @flow
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import NewThreadForm from '../containers/NewThreadForm'
import NotFound from '../components/NotFound'
import Page from '../components/Page'
import ThreadList from '../containers/ThreadList'
import ThreadPage from '../containers/ThreadPage'
import type { Action, Dispatch, State } from '../types'

const App = ({ store }: { store: Store<State, Action, Dispatch> }) => {
  return <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => (
          <Page>
            <ThreadList />
          </Page>
        )} />
        <Route exact path="/:id" render={({ match }) => (
          <Page>
            <ThreadPage id={match.params.id} />
          </Page>
        )} />
        <Route render={() => (
          <Page>
            <NotFound />
          </Page>
        )} />
      </Switch>
    </Router>
  </Provider>
}

export default hot(module)(App)
