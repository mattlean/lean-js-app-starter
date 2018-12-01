// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ mode = 'top' }: { mode: string }) => {
  if(mode === 'bottom') {
    return (
      <nav id="bottom">
        <hr />
        [<Link to="/">Return</Link>]
        {' '}
        [<a href="#">Top</a>]
      </nav>
    )
  }
  return (
    <nav>
      [<Link to="/">Return</Link>]
      {' '}
      [<a href="#bottom">Bottom</a>]
      <hr />
    </nav>
  )
}

export default Nav
