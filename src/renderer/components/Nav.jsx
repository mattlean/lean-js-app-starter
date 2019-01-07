// @flow
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => <nav id="nav">
  <Link to="/">Home</Link>
  <span>·</span>
  <Link to="/counter">Counter Example</Link>
  <span>·</span>
  <a href="#">Docs</a>
  <span>·</span>
  <a href="https://github.com/IsaacLean/lean-js-app-starter">GitHub</a>
</nav>

export default Nav
