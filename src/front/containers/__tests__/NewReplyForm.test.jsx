import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'

import { NewReplyForm } from '../NewReplyForm'

describe('NewReplyForm', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Router>
        <NewReplyForm />
      </Router>
    )
    expect(component).toMatchSnapshot()
  })
})
