// @flow
import React from 'react'
import moment from 'moment'

import type { Reply as ReplyType } from '../types'

const Reply = ({ data }: { data: ReplyType }) => (
  <li className="reply">
    <header>
      <b>Anonymous</b>
      {' '}
      {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
      {' Id.'}
      {data._id}
    </header>
    {data.comment}
  </li>
)

export default Reply
