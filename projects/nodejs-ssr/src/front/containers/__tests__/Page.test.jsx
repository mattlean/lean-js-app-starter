import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { Page } from '../Page'

Enzyme.configure({ adapter: new Adapter() })

describe('Page', () => {
  it('renders properly', () => {
    const component = shallow(<Page />)
    expect(component).toMatchSnapshot()
  })
})
