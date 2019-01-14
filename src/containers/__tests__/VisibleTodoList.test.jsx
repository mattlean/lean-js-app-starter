import React from 'react'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import todos from '../../reducers'
import VisibleTodoList from '../VisibleTodoList'
import { setupStore } from '../../util/store'

describe('VisibleTodoList', () => {
  it('renders properly', () => {
    const container = renderer.create(
      <Provider store={setupStore(todos, null, [thunk])}>
        <Router>
          <VisibleTodoList />
        </Router>
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
