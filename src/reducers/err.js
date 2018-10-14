// @flow
import type { Action, State_Err } from '../types'

const defaultState = {}

const err = (state: State_Err = defaultState, action: Action): State_Err => {
  switch(action.type) {
    case 'SET_ERR':
      return action.err
    case 'CLEAR_ERR':
      return defaultState
    default:
      return state
  }
}

export default err
