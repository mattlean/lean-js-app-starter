import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { ThreadPage } from '../ThreadPage'

Enzyme.configure({ adapter: new Adapter() })

describe('ThreadPage', () => {
  const data = {
    _id: '5bee2f90c43e83433b5e5d24',
    subject: 'New Thread',
    comment: 'I am the new thread comment.',
    createdAt: '2018-11-16T02:46:40.301Z',
    replies: [
      {
        _id: '5bee2f90c43e83433b5e5d25',
        createdAt: '2018-11-16T02:46:40.311Z',
        comment: 'All your base are belong to us.',
        type: 'Reply'
      }
    ],
    type: 'Thread'
  }

  it('renders properly when loading', () => {
    const component = shallow(<ThreadPage id={data._id} isFetching={true} />)
    expect(component).toMatchSnapshot()
  })

  it('renders properly when loaded', () => {
    const component = shallow(<ThreadPage id={data._id} isFetching={false} thread={data} />)
    expect(component).toMatchSnapshot()
  })
})
