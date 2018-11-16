import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'

import Thread from '../Thread'

describe('Thread', () => {
  it('renders properly', () => {
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
    const component = renderer.create(
      <Router>
        <Thread data={data} />
      </Router>
    )
    expect(component).toMatchSnapshot()
  })
})
