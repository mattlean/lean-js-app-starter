import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import FilterLink from '../FilterLink'
import { mockDatabase } from '../../util/mockAPI'

Enzyme.configure({ adapter: new Adapter() })

describe('FilterLink', () => {
  it('renders properly', () => {
    const component = shallow(<FilterLink todos={mockDatabase.todos} />)
    expect(component).toMatchSnapshot()
  })
})
