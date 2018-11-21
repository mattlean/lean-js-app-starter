// @flow
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import todos from '../reducers'

export const setupStore = () => {
  const middlewares = [thunk]

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    todos,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}
