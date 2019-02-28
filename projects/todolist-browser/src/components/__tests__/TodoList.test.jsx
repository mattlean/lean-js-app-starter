import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import TodoList from '../TodoList'
import { mockDatabase } from '../../util/mockAPI'

Enzyme.configure({ adapter: new Adapter() })

describe('TodoList', () => {
  it('renders properly', () => {
    const component = shallow(<TodoList todos={mockDatabase.todos} />)
    expect(component).toMatchSnapshot()
  })
})
