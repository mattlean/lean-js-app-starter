import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../reducers'

export const setupStore = preloadedState => {
  const middlewares = [thunk]

  if(process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger())
  }

  const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  if(preloadedState) {
    return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
  }
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
}

export default setupStore
