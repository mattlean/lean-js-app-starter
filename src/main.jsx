// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// import ReduxCounter from './containers/ReduxCounter'
// import counter from './reducers/counter'
import TodoApp from './components/TodoApp'
import { createStore } from 'redux'
import { todoApp } from './reducers'

import './main.scss'

const root = document.getElementById('root')

if(root) {
  ReactDOM.render(
    <Provider store={createStore(
      todoApp,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
      <TodoApp />
    </Provider>,
    root
  )
}

// if(root) {
//   ReactDOM.render(
//     <Provider store={createStore(
//       counter,
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )}>
//       <ReduxCounter />
//     </Provider>
//     ,
//     root
//   )
// }
