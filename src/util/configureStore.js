import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'

import todos from '../reducers'

const configureStore = () => {
  const middlewares = [thunk]

  if(process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger())
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    todos,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}

export default configureStore
