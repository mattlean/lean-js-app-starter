// @flow
import React from 'react'
import { Link } from 'react-router-dom'
import { shell } from 'electron'

const Nav = () => <nav id="nav">
  <Link to="/">Home</Link>
  <span>·</span>
  <Link to="/counter">Counter Example</Link>
  <span>·</span>
  <a href="https://github.com/IsaacLean/lean-js-app-starter/tree/master/docs" onClick={e => {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }}>Docs</a>
  <span>·</span>
  <a href="https://github.com/IsaacLean/lean-js-app-starter" onClick={e => {
    e.preventDefault()
    shell.openExternal(e.target.href)
  }}>GitHub</a>
</nav>

export default Nav
