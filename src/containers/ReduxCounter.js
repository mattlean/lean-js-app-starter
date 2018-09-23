// @flow
import { connect } from 'react-redux'

import Counter from '../components/Counter'

const mapStateToProps = state => ({
  value: state
})

const mapDispatchToProps = dispatch => ({
  onDecrement() {
    dispatch({type: 'DECREMENT'})
  },
  onIncrement() {
    dispatch({type: 'INCREMENT'})
  }
})

const ReduxCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

export default ReduxCounter
