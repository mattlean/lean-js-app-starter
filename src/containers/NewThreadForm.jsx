import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createThread } from '../actions'

class NewThreadForm extends Component {
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
    this.props.createThread({
      subject: this.state.subject,
      comment: this.state.comment
    })
      .then(thread => {
        this.props.history.push(`/${thread._id}`)
        this.setState({ show: false })
        this.reset()
      })
  }

  reset = () => {
    this.setState({
      subject: '',
      comment: ''
    })
  }

  render() {
    if(this.state.show) {
      return <form id="new-thread-form" className="center" onSubmit={this.handleSubmit}>
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
            <tr>
              <td colSpan="2">
                <button type="submit">Post</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    }
    return <span className="center">[<a href="#" onClick={this.handleClick}>Start a New Thread</a>]</span>
  }
}

NewThreadForm.propTypes = {
  createThread: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators({ createThread }, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(NewThreadForm))
