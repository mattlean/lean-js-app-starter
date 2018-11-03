// @flow

import type { Action, State, State_ById } from '../types'

export const defaultState = {}

const byId = (state: State = defaultState, action: Action): State => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    }
  }

  return state
}

export default byId

export const getTodo = (state: State_ById, id: string) => state[id]
