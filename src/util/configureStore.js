import { createStore } from 'redux'

import { todoApp } from '../reducers'

/* eslint-disable no-console */
const logger = store => next => {
  if(!console.group) {
    return next
  }

  return action => {
    console.group(action.type)
    console.log('%cprev state', 'color: gray', store.getState())
    console.log('%caction', 'color: blue', action)
    const returnValue = next(action)
    console.log('%cnext state', 'color: green', store.getState())
    console.groupEnd()
    return returnValue
  }
}
/* eslint-enable no-console */

const promise = () => next => action => {
  if(typeof action.then === 'function') {
    return action.then(next)
  }
  return next(action)
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => store.dispatch = middleware(store)(store.dispatch))
}

const configureStore = () => {
  const store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  const middlewares = [promise]

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(logger)
  }

  wrapDispatchWithMiddlewares(store, middlewares)

  return store
}

export default configureStore
