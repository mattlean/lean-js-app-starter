import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'

import Thread from '../Thread'
import { threads } from '../../util/test/data'

describe('Thread', () => {
  it('renders properly', () => {
    const thread = threads[0]
    const component = renderer.create(
      <Router>
        <Thread data={thread} />
      </Router>
    )
    expect(component).toMatchSnapshot()
  })
})
