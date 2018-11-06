import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import AddTodo from '../AddTodo'
import setupStore from '../../util/setupStore'

describe('AddTodo', () => {
  it('renders properly', () => {
    const container = renderer.create(
      <Provider store={setupStore()}>
        <AddTodo />
      </Provider>
    )
    expect(container).toMatchSnapshot()
  })
})
