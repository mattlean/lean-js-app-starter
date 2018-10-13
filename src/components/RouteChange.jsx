// @flow
import * as React from 'react'
import { withRouter } from 'react-router-dom'
import type { Location } from 'react-router-dom'

type Props = {
  children: React.Node,
  location: Location,
}

class RouteChange extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(RouteChange)
