// @flow
import throttle from 'lodash/throttle'
import { createStore } from 'redux'

import { loadState, saveState } from './localStorage'
import { todoApp } from '../reducers'

/* eslint-disable no-console */
const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch

  if(!console.group) {
    return rawDispatch
  }

  return action => {
    console.group(action.type)
    console.log('%cprev state', 'color: gray', store.getState())
    console.log('%caction', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%cnext state', 'color: green', store.getState())
    console.groupEnd()
    return returnValue
  }
}
/* eslint-enable no-console */

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(
    todoApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  if(process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }
  store.subscribe(throttle(() => saveState({ todos: store.getState().todos }), 1000))

  return store
}

export default configureStore
