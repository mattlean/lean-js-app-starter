// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import NewThreadForm from '../containers/NewThreadForm'
import NewReplyForm from '../containers/NewReplyForm'
import Page from '../containers/Page'
import RouteChange from '../containers/RouteChange'
import ThreadList from '../containers/ThreadList'
import ThreadPage from '../containers/ThreadPage'

const Root = () => {
  return (
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
  )
}

export default hot(module)(Root)
