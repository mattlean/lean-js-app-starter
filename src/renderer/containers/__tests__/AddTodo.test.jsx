import React from 'react'
import renderer from 'react-test-renderer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import AddTodo from '../AddTodo'
import todos from '../../reducers'
import { setupStore } from '../../util/store'

describe('AddTodo', () => {
  it('renders properly', () => {
    const container = renderer.create(
      <Provider store={setupStore(todos, null, [thunk])}>
        <AddTodo />
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
