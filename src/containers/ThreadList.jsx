import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Threads from '../components/Threads'
import { fetchThreads } from '../actions'
import { getThreads } from '../reducers'

class ThreadList extends Component {
  componentDidMount() {
    this.props.fetchThreads()
  }

  render() {
    return <Threads threads={this.props.threads} />
  }
}

ThreadList.propTypes = {
  fetchThreads: PropTypes.func.isRequired,
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
  threads: getThreads(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchThreads }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)
