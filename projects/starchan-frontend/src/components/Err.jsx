// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import HTTPErr from '../util/HTTPErr'

const Err = ({ data }: { data: HTTPErr }) => {
  let status
  let message

  if(data) {
    if(data.res && data.res.status) {
      status = <h2 className="center">{data.res.status}</h2>
    }

    if(data.message) {
      message = <p className="center"><i>{data.message}</i></p>
    }
  }

  return (
    <div id="not-found">
      {status}
      {message}
      <span className="center">[<Link to="/">Back to Home</Link>]</span>
    </div>
  )
}

export default Err
