// @flow
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Store } from 'redux'

import NewThreadForm from '../containers/NewThreadForm'
import NewReplyForm from '../containers/NewReplyForm'
import Page from '../containers/Page'
import RouteChange from '../containers/RouteChange'
import ThreadList from '../containers/ThreadList'
import ThreadPage from '../containers/ThreadPage'
import type { Action, Dispatch, State } from '../types'

const Root = ({ store }: { store: Store<State, Action, Dispatch> }) => {
  return (
    <Provider store={store}>
      <Router>
        <RouteChange>
          <Switch>
            <Route exact path="/" render={() => (
              <Page Form={NewThreadForm}>
                <ThreadList />
              </Page>
            )} />
            <Route path="/:id" render={({ match }) => (
              <Page Form={NewReplyForm}>
                <ThreadPage id={match.params.id} />
              </Page>
            )} />
          </Switch>
        </RouteChange>
      </Router>
    </Provider>
  )
}

export default hot(module)(Root)
