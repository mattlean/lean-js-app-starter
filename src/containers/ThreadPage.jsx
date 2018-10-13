import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Nav from '../components/Nav'
import Threads from '../components/Threads'
import { fetchThreads } from '../actions'
import { getThread } from '../reducers'
import { setDocTitle } from '../util'

class ThreadPage extends Component {
  componentDidMount() {
    if(!this.props.thread) {
      this.props.fetchThreads(this.props.id)
        .then(thread => {
          setDocTitle(thread.subject || `Thread ${thread._id}`)
        })
    } else {
      setDocTitle(this.props.thread.subject || `Thread ${this.props.thread._id}`)
    }
  }

  render() {
    let thread = []
    if(this.props.thread) {
      thread.push(this.props.thread)
    }

    return <>
      <Nav mode="top" />
      <Threads threads={thread} />
      <Nav mode="bottom" />
    </>
  }
}

ThreadPage.propTypes = {
  fetchThreads: PropTypes.func,
  id: PropTypes.string,
  thread: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  thread: getThread(state, ownProps.id)
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchThreads }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPage)
