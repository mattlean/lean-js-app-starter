// @flow
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Nav from './Nav'
import { postThreads } from '../util/api'

type State = {
  subject: string,
  comment: string,
  redirect: boolean
}

class NewThreadForm extends Component<{}, State> {
  state = {
    subject: '',
    comment: '',
    redirect: false
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>, state: string) => {
    this.setState({ [state]: e.currentTarget.value })
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    postThreads({
      subject: this.state.subject,
      comment: this.state.comment
    }).then(() => {
      this.setState({ redirect: true })
    })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/" />
    }
    return <>
      <form id="new-thread-form" className="center" onSubmit={this.handleSubmit}>
        <table>
          <tbody>
            <tr>
              <th><label htmlFor="subject">Subject</label></th>
              <td>
                <input
                  id="subject"
                  type="text"
                  value={this.state.subject}
                  onChange={e => this.handleChange(e, 'subject')}
                />
              </td>
            </tr>
            <tr>
              <th><label htmlFor="comment">Comment</label></th>
              <td>
                <textarea
                  id="comment"
                  value={this.state.comment}
                  onChange={e => this.handleChange(e, 'comment')}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Post</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Nav mode="bottom" />
    </>
  }
}

export default NewThreadForm
