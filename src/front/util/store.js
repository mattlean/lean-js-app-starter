import { applyMiddleware, compose, createStore } from 'redux'

export const isServerRendered = () => {
  if(window.__PRELOADED_STATE__) {
    delete window.__PRELOADED_STATE__
    return true
  }
  return false
}

export const setupStore = (reducer, preloadedState, middlewares = [], devMiddlewares) => {
  if(!middlewares) middlewares = []

  if(process.env.NODE_ENV === 'development' && Array.isArray(devMiddlewares)) {
    middlewares = [...middlewares, ...devMiddlewares]
  }

  if(__isBrowser__) { // eslint-disable-line no-undef
    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    if(preloadedState !== null && preloadedState !== undefined) {
      return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
    }

    return createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
  }

  if(preloadedState) {
    return createStore(reducer, preloadedState, applyMiddleware(...middlewares))
  }
  return createStore(reducer, applyMiddleware(...middlewares))
}

export default setupStore
