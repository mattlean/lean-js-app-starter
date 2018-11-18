import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Threads from '../Threads'
import { threads } from '../../util/test/data'

Enzyme.configure({ adapter: new Adapter() })

describe('Threads', () => {
  it('renders properly', () => {
    const component = shallow(<Threads threads={threads} />)
    expect(component).toMatchSnapshot()
  })
})
