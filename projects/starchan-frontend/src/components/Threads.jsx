// @flow
import React, { Component } from 'react'

import Thread from './Thread'
import type { Thread as ThreadType } from '../types'

type Props = { data: Array<ThreadType> }

class Threads extends Component<Props> {
  render() {
    return <ul id="threads">
      {this.props.data.map((thread, i) => {
        if(i < this.props.data.length-1) {
          return <React.Fragment key={thread._id}>
            <Thread data={thread} />
            <hr />
          </React.Fragment>
        }
        return <Thread key={thread._id} data={thread} />
      })}
    </ul>
  }
}

export default Threads
