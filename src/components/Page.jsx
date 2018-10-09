// @flow
import * as React from 'react'

const Page = ({ children }: { children?: React.Node }) => (<div>
  <h1 id="title">*chan</h1>
  <hr />
  { children }
</div>)

export default Page
