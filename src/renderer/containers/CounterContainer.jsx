// @flow
import { connect } from 'react-redux'

import * as actions from '../actions'
import Counter from '../components/Counter'
import type { State } from '../types'

const mapStateToProps = (state: State) => ({
  counter: state.counter ? state.counter : 0
})

const CounterContainer = connect(
  mapStateToProps,
  {
    onMinusClick: actions.decrement,
    onPlusClick: actions.increment
  }
)(Counter)

export default CounterContainer
