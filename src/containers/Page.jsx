// @flow
import * as React from 'react'
import { connect } from 'react-redux'

import Err from '../components/Err'
import HTTPErr from '../util/HTTPErr'
import NewReplyForm from '../containers/NewReplyForm'
import NewThreadForm from '../containers/NewThreadForm'

const Page = ({ children, err, Form }: { children?: React.Node, err?: HTTPErr, Form?: NewReplyForm | NewThreadForm} ) => {
  let content
  let form

  if(err && err.message) {
    content = <Err data={err} />
  } else {
    content = <main>{ children }</main>

    if(Form) form = <Form />
  }

  return (
    <div>
      <header id="page-head">
        <h1 className="center">*chan</h1>
        {form}
        <hr />
      </header>
      {content}
    </div>
  )
}

const mapStateToProps = state => ({
  err: state.err
})

export default connect(mapStateToProps)(Page)
