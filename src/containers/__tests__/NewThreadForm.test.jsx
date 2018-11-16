import React from 'react'
import renderer from 'react-test-renderer'
import { HashRouter as Router } from 'react-router-dom'

import { NewThreadForm } from '../NewThreadForm'

describe('NewThreadForm', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Router>
        <NewThreadForm />
      </Router>
    )
    expect(component).toMatchSnapshot()
  })
})
