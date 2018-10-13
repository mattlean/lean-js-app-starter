import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Loading from '../components/Loading'
import Threads from '../components/Threads'
import { fetchThreads } from '../actions'
import { getThreads } from '../reducers'
import { setDocTitle } from '../util'

class ThreadList extends Component {
  componentDidMount() {
    setDocTitle()
    this.props.fetchThreads()
  }

  render() {
    if(this.props.isFetching && Array.isArray(this.props.threads) && this.props.threads.length === 0) {
      return <Loading />
    }
    return <Threads threads={this.props.threads} />
  }
}

ThreadList.propTypes = {
  fetchThreads: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    subject: PropTypes.string,
    comment: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired
    }))
  }))
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
  threads: getThreads(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchThreads }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)
