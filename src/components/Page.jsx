// @flow
import * as React from 'react'

const Page = ({ children }: { children?: React.Node }) => (<div>
  <header id="page-head">
    <h1 className="center">*chan</h1>
    <span className="center">[<a href="#">Start a New Thread</a>]</span>
    <hr />
  </header>
  <main>
    { children }
  </main>
</div>)

export default Page
