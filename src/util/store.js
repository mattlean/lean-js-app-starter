import { applyMiddleware, compose, createStore } from 'redux'

export const setupStore = (reducer, preloadedState, middlewares = [], devMiddlewares) => {
  if(process.env.NODE_ENV === 'development' && Array.isArray(devMiddlewares)) {
    middlewares = [...middlewares, ...devMiddlewares]
  }

  const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  if(preloadedState !== null && preloadedState !== undefined) {
    return createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
  }
  return createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)))
}

export default setupStore
