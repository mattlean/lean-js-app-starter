import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Loading from '../Loading'

Enzyme.configure({ adapter: new Adapter() })

describe('Loading', () => {
  it('renders properly', () => {
    const component = shallow(<Loading />)
    expect(component).toMatchSnapshot()
  })
})
