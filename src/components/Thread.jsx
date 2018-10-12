// @flow
import moment from 'moment'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import type { Match } from 'react-router-dom'

import Reply from './Reply'
import type { Thread as ThreadType } from '../types'

const Thread = ({ data, match }: { data: ThreadType, match: Match }) => {
  let subject
  if(data.subject) {
    subject = <strong>{data.subject} {' '}</strong>
  }

  let replies
  if(Array.isArray(data.replies) && data.replies.length > 0) {
    replies = data.replies.map(reply => <Reply key={reply._id} data={reply} />)
    replies = <ul>{replies}</ul>
  }

  let replyLink
  if(!match.params.id) replyLink = <>
    {' '}
    [<Link to={`/${data._id}`}>Reply</Link>]
  </>

  return <li className="thread">
    <header>
      {subject}
      <b className="name">Anonymous</b>
      {' '}
      {moment(data.createdAt).format('MM/DD/YY(ddd)HH:DD:SS')}
      {' Id.'}
      {data._id}
      {replyLink}
    </header>
    <pre className="comment">
      {data.comment}
    </pre>
    {replies}
  </li>
}

export default withRouter(Thread)
