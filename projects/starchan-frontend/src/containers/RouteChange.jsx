import * as React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { clearAllErrs } from '../actions'

class RouteChange extends React.Component {
  componentDidUpdate(prevProps) {
    const { clearAllErrs, err, location } = this.props

    if (location !== prevProps.location) {
      if(Object.keys(err).length > 0) clearAllErrs()

      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

RouteChange.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  clearAllErrs: PropTypes.func.isRequired,
  err: PropTypes.object,
  location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  err: state.err
})

const mapDispatchToProps = dispatch => bindActionCreators({ clearAllErrs }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteChange))
