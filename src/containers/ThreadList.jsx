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
  fetchThreads: PropTypes.func,
  threads: PropTypes.array
}

const mapStateToProps = state => ({
  threads: getThreads(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchThreads }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)
