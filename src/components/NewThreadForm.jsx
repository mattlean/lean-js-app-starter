// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

type State = {
  subject: string,
  comment: string
}

class NewThreadForm extends Component<{}, State> {
  state = {
    subject: '',
    comment: ''
  }

  handleChange = (e: SyntheticEvent<HTMLInputElement>, state: string) => {
    this.setState({[state]: e.currentTarget.value})
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  render() {
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
      <hr />
      <footer>
        [<Link to="/">Return</Link>]
      </footer>
    </>
  }
}

export default NewThreadForm
