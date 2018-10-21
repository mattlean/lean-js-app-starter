import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '../../client/reducers'

export const isServerRendered = () => {
  if(window.__PRELOADED_STATE__) {
    delete window.__PRELOADED_STATE__
    return true
  }
  return false
}

export const setupStore = (preloadedState) => {
  const middlewares = [thunk]

  if(__isBrowser__) { // eslint-disable-line no-undef
    if(process.env.NODE_ENV !== 'production') {
      middlewares.push(createLogger())
    }

    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
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
