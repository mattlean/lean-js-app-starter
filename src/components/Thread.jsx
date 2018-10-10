// @flow
import React from 'react'
import moment from 'moment'

import Reply from './Reply'
import type { Thread as ThreadType } from '../types'

const Thread = ({ data }: { data: ThreadType }) => {
  let subject
  if(data.subject) {
    subject = <strong>{data.subject} {' '}</strong>
  }

  let replies
  if(Array.isArray(data.replies) && data.replies.length > 0) {
    replies = data.replies.map(reply => <Reply key={reply._id} data={reply} />)
    replies = <ul>{replies}</ul>
  }

  return <li className="thread">
    <header>
      {subject}
      <b className="name">Anonymous</b>
      {' '}
      {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
      {' Id.'}
      {data._id}
    </header>
    <section className="comment">
      {data.comment}
    </section>
    {replies}
  </li>
}

export default Thread
