import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import NoMatch from '../NoMatch'

Enzyme.configure({ adapter: new Adapter() })

describe('NoMatch', () => {
  it('renders properly', () => {
    const component = shallow(<NoMatch />)
    expect(component).toMatchSnapshot()
  })
})
