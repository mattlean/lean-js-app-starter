import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { ThreadList } from '../ThreadList'

Enzyme.configure({ adapter: new Adapter() })

describe('ThreadList', () => {
  it('renders properly', () => {
    const component = shallow(<ThreadList isFetching={true} threads={[]} />)
    expect(component).toMatchSnapshot()
  })
})
