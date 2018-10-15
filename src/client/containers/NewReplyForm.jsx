import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { createReply, setErr } from '../actions'

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
      .then(() => {
        this.reset()
      })
      .catch(err => {
        this.props.setErr('create', err)
      })
  }

  reset = () => {
    this.setState({
      comment: '',
      show: false
    })
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
    return <span className="center">[<a href="#" onClick={this.handleClick}>Post a Reply</a>]</span>
  }
}

NewReplyForm.propTypes = {
  createReply: PropTypes.func.isRequired,
  err: PropTypes.object,
  match: PropTypes.object.isRequired,
  setErr: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  err: state.err.create
})

const mapDispatchToProps = dispatch => bindActionCreators({ createReply, setErr }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewReplyForm))
