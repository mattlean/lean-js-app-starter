import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Thread from '../components/Thread'
import { fetchThreads } from '../actions'
import { getThreads } from '../reducers'

class ThreadList extends Component {
  componentDidMount() {
    this.props.fetchThreads()
  }

  render() {
    const threads = this.props.threads.map((thread, i) => {
      if(i < this.props.threads.length-1) {
        return <React.Fragment key={thread._id}>
          <Thread data={thread} />
          <hr />
        </React.Fragment>
      }
      return <Thread key={thread._id} data={thread} />
    })

    return <ul id="threads">
      {threads}
    </ul>
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
