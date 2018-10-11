// @flow
import React from 'react'
import moment from 'moment'

import type { Reply as ReplyType } from '../types'

const Reply = ({ data }: { data: ReplyType }) => (
  <li className="reply">
    <div>
      <header>
        <b className="name">Anonymous</b>
        {' '}
        {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
        {' Id.'}
        {data._id}
      </header>
      <pre className="comment">
        {data.comment}
      </pre>
    </div>
  </li>
)

export default Reply
