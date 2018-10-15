// @flow
import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

const setupStore = () => {
  const middlewares = [thunk]

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
}

export default setupStore
