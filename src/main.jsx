import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import TodoApp from './components/TodoApp'
import { createStore } from 'redux'
import { todoApp } from './reducers'
import './main.scss'

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)
