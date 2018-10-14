import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { clearErr } from '../actions'


class RouteChange extends React.Component {
  componentDidUpdate(prevProps) {
    const { clearErr, err, location } = this.props

    if (location !== prevProps.location) {
      if(err.message) clearErr()

      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  err: state.err
})

const mapDispatchToProps = dispatch => bindActionCreators({ clearErr }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteChange))
