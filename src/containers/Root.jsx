import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'

import App from '../components/App'

const Root = ({ store }) => {
  return <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
}

export default hot(module)(Root)
