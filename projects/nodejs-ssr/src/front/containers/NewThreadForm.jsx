import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createThread, setErr } from '../actions'

class NewThreadFormClass extends Component {
  state = {
    subject: '',
    comment: '',
    show: false
  }

  handleChange = (e, state) => {
    this.setState({ [state]: e.currentTarget.value })
  }

  handleClick = e => {
    e.preventDefault()
    this.setState({ show: true })
  }

  handleSubmit = e => {
    e.preventDefault()
    if(this.props.createThread) {
      this.props.createThread({
        subject: this.state.subject,
        comment: this.state.comment
      })
        .then(thread => {
          this.props.history.push(`/${thread._id}`)
        })
        .catch(err => {
          if(this.props.setErr) {
            this.props.setErr('create', err)
          }
        })
    }
  }

  render() {
    if(this.state.show) {
      let err
      if(this.props.err) {
        let statusTxt
        if(this.props.err.res && this.props.err.res.status) statusTxt = `${this.props.err.res.status} - `

        err = (
          <tr>
            <td colSpan="2">
              <b className="center">ERROR: {statusTxt}{this.props.err.message}</b>
            </td>
          </tr>
        )
      }

      return <form id="new-form" className="center" onSubmit={this.handleSubmit}>
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
                  required
                />
              </td>
            </tr>
            {err}
            <tr>
              <td colSpan="2">
                <button type="submit">Post</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    }
    return <>
      <span className="center">[<a href="#" onClick={this.handleClick}>Start a New Thread</a>]</span>
      <noscript>
        <form id="new-form" action="/api/thread" method="post" className="center">
          <table>
            <tbody>
              <tr>
                <th><label htmlFor="subject">Subject</label></th>
                <td>
                  <input id="subject" name="subject" type="text" />
                </td>
              </tr>
              <tr>
                <th><label htmlFor="comment">Comment</label></th>
                <td>
                  <textarea id="comment" name="comment" required />
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
      </noscript>
    </>
  }
}

NewThreadFormClass.propTypes = {
  createThread: PropTypes.func,
  err: PropTypes.object,
  history: PropTypes.object.isRequired,
  setErr: PropTypes.func
}

export const NewThreadForm = withRouter(NewThreadFormClass)

const mapStateToProps = state => ({
  err: state.err.create
})

const mapDispatchToProps = dispatch => bindActionCreators({ createThread, setErr }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewThreadFormClass))
