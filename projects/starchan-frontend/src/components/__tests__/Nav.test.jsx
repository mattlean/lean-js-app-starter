import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Nav from '../Nav'

Enzyme.configure({ adapter: new Adapter() })

describe('Nav', () => {
  it('renders properly', () => {
    const component = shallow(<Nav />)
    expect(component).toMatchSnapshot()
  })
})
