// @flow
import * as React from 'react'

import Nav from './Nav'

const Page = ({ children }: { children?: React.Node }) => <>
  <h1 id="title">Lean JavaScript Application Starter</h1>
  {children}
  <Nav />
</>

export default Page
