import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Counter from '../Counter'

Enzyme.configure({ adapter: new Adapter() })

describe('Counter', () => {
  it('renders properly', () => {
    const component = shallow(<Counter />)
    expect(component).toMatchSnapshot()
  })
})
