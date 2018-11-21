import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import VisibleTodoList from '../VisibleTodoList'
import { setupStore } from '../../util/store'

describe('VisibleTodoList', () => {
  it('renders properly', () => {
    const container = renderer.create(
      <Provider store={setupStore()}>
        <Router>
          <VisibleTodoList />
        </Router>
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
