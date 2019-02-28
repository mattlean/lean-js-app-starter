import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { ThreadPage } from '../ThreadPage'
import { threads } from '../../util/test/data'

Enzyme.configure({ adapter: new Adapter() })

describe('ThreadPage', () => {
  const thread = threads[0]

  it('renders properly when loading', () => {
    const component = shallow(<ThreadPage id={thread._id} isFetching={true} />)
    expect(component).toMatchSnapshot()
  })

  it('renders properly when loaded', () => {
    const component = shallow(<ThreadPage id={thread._id} isFetching={false} thread={thread} />)
    expect(component).toMatchSnapshot()
  })
})
