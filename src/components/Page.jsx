// @flow
import * as React from 'react'

import NewReplyForm from '../containers/NewReplyForm'
import NewThreadForm from '../containers/NewThreadForm'

const Page = ({ children, Form }: { children?: React.Node, Form?: NewReplyForm | NewThreadForm }) => {
  let form
  if(Form) form = <Form />

  return (
    <div>
      <header id="page-head">
        <h1 className="center">*chan</h1>
        {form}
        <hr />
      </header>
      <main>
        { children }
      </main>
    </div>
  )
}

export default Page
