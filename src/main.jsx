// @flow
import React from 'react'
import ReactDOM from 'react-dom'

// import ReduxCounter from './containers/ReduxCounter'
// import counter from './reducers/counter'
import Root from './components/Root'
import configureStore from './util/configureStore'

import './main.scss'

const root = document.getElementById('root')
const store = configureStore()

if(root && store) {
  ReactDOM.render(<Root store={store} />, root)
}

// if(root) {
//   ReactDOM.render(
//     <Provider store={createStore(
//       counter,
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )}>
//       <ReduxCounter />
//     </Provider>,
//     root
//   )
// }
