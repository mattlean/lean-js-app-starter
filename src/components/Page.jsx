// @flow
import * as React from 'react'

import NewThreadForm from '../containers/NewThreadForm'

const Page = ({ children }: { children?: React.Node }) => (
  <div>
    <header id="page-head">
      <h1 className="center">*chan</h1>
      <NewThreadForm />
      <hr />
    </header>
    <main>
      { children }
    </main>
  </div>
)

export default Page
