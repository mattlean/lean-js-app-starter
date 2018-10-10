// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div id="not-found">
    <h2 className="center">404 Not Found</h2>
    <span className="center">[<Link to="/">Back to Home</Link>]</span>
  </div>
)

export default NotFound
