import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Reply from '../Reply'

Enzyme.configure({ adapter: new Adapter() })

describe('Reply', () => {
  it('renders properly', () => {
    const data = {
      _id: '5bee2f90c43e83433b5e5d25',
      createdAt: '2018-11-16T02:46:40.311Z',
      comment: 'All your base are belong to us.',
      type: 'Reply'
    }
    const component = shallow(<Reply data={data} />)
    expect(component).toMatchSnapshot()
  })
})
