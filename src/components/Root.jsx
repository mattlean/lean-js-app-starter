import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import TodoApp from '../components/TodoApp'

const Root = ({ store }) => {
  return <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={TodoApp} />
    </Router>
  </Provider>
}

export default Root
