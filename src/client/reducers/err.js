// @flow
import type { Action, State_Err } from '../types'

const defaultState = {}

const err = (state: State_Err = defaultState, action: Action): State_Err => {
  switch(action.type) {
    case 'CLEAR_ALL_ERRS':
      return defaultState
    case 'CLEAR_ERR': {
      const newState = { ...state }
      delete newState[action.key]
      return newState
    }
    case 'SET_ERR':
      return {
        ...state,
        [action.key]: action.err
      }
    default:
      return state
  }
}

export default err
