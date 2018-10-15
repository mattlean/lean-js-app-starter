import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import Nav from '../components/Nav'
import Threads from '../components/Threads'
import { endFetch, fetchThreads, setErr } from '../actions'
import { getThread } from '../reducers'
import { setDocTitle } from '../util'

class ThreadPage extends Component {
  componentDidMount() {
    if(this.props.thread) {
      setDocTitle(this.props.thread.subject || `Thread ${this.props.thread._id}`)
    }

    this.props.fetchThreads(this.props.id)
      .then(thread => {
        setDocTitle(thread.subject || `Thread ${thread._id}`)
      })
      .catch(err => {
        if(!this.props.thread) {
          this.props.setErr('read', err)
        } else {
          this.props.endFetch()
        }
      })
  }

  render() {
    let content
    if(this.props.thread) {
      content = <Threads threads={[this.props.thread]} />
    } else if(!this.props.thread && this.props.isFetching) {
      content = <Loading />
    }

    return <>
      <Nav mode="top" />
      {content}
      <Nav mode="bottom" />
    </>
  }
}

ThreadPage.propTypes = {
  endFetch: PropTypes.func.isRequired,
  fetchThreads: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setErr: PropTypes.func.isRequired,
  thread: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.isFetching,
  thread: getThread(state, ownProps.id)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  endFetch,
  fetchThreads,
  setErr
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadPage)
