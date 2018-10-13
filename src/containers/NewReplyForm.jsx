import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createReply } from '../actions'

class NewReplyForm extends Component {
  state = {
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
    this.props.createReply(
      this.props.match.params.id,
      { comment: this.state.comment }
    )
      .then(thread => {
        this.setState({ show: false })
        this.reset()
      })
  }

  reset = () => {
    this.setState({ comment: '' })
  }

  render() {
    if(this.state.show) {
      return <form id="new-thread-form" className="center" onSubmit={this.handleSubmit}>
        <table>
          <tbody>
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
    return <span className="center">[<a href="#" onClick={this.handleClick}>Post a Reply</a>]</span>
  }
}

NewReplyForm.propTypes = {
  createReply: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators({ createReply }, dispatch)

export default withRouter(connect(null, mapDispatchToProps)(NewReplyForm))
