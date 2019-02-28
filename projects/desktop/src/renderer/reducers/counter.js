// @flow

import type { Action, State_Counter } from '../types'

export const defaultState = 0

const counter = (state: State_Counter = defaultState, action: Action) => {
  if(action.type === 'INCREMENT') {
    return state + 1
  } else if(action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}

export default counter
