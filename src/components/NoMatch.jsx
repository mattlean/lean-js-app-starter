// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => <div>
  <h1>Not Found!</h1>
  <Link to="/">Go back Home</Link>
</div>

export default NoMatch
