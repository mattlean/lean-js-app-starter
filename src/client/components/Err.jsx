// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import HTTPErr from '../util/HTTPErr'

const Err = ({ data }: { data: HTTPErr }) => {
  let status
  if(data.res && data.res.status) {
    status = <h2 className="center">{data.res.status}</h2>
  }

  return (
    <div id="not-found">
      {status}
      <p className="center"><i>{data.message}</i></p>
      <span className="center">[<Link to="/">Back to Home</Link>]</span>
    </div>
  )
}

export default Err
