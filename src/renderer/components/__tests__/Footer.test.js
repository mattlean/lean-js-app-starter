import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Footer from '../Footer'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
  test('snapshot', () => {
    const component = shallow(<Footer />)
    expect(component).toMatchSnapshot()
  })
})
