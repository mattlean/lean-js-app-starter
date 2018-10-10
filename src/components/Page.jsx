// @flow
import * as React from 'react'
import { Link } from 'react-router-dom'

const Page = ({ children }: { children?: React.Node }) => (<div>
  <header id="page-head">
    <h1 className="center">*chan</h1>
    <span className="center">[<Link to="/new">Start a New Thread</Link>]</span>
    <hr />
  </header>
  <main>
    { children }
  </main>
</div>)

export default Page
