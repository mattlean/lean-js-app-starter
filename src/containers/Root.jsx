// @flow
import React from 'react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import type { Store } from 'redux'


import Page from '../components/Page'
import ThreadList from '../containers/ThreadList'
import type { Action, Dispatch, State } from '../types'

const App = ({ store }: { store: Store<State, Action, Dispatch> }) => {
  return <Provider store={store}>
    <Page>
      <ThreadList />
    </Page>
  </Provider>
}

export default hot(module)(App)
