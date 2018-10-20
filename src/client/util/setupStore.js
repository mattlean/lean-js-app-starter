import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../../client/reducers'

const setupStore = (preloadedState) => {
  const middlewares = [thunk]

  let composeEnhancers
  if(__isBrowser__) { // eslint-disable-line no-undef
    if(process.env.NODE_ENV !== 'production') {
      middlewares.push(createLogger())
    }

    composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    if(preloadedState) {
      return createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
    }
    return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))
  }

  if(preloadedState) {
    return createStore(rootReducer, preloadedState, applyMiddleware(...middlewares))
  }
  return createStore(rootReducer, applyMiddleware(...middlewares))
}

export default setupStore
