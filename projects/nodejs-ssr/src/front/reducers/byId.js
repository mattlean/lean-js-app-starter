// @flow
import type { Action, State_ById } from '../types'

export const defaultState = {}

const byId = (state: State_ById = defaultState, action: Action): State_ById => {
  switch(action.type) {
    case 'CREATE_REPLY_SUCCESS':
    case 'CREATE_THREAD_SUCCESS':
    case 'FETCH_THREAD_SUCCESS':
    case 'FETCH_THREADS_SUCCESS':
      return {
        ...state,
        ...action.res.entities.threads
      }
    default:
      return state
  }
}

export default byId

export const getThread = (state: State_ById, id: string) => state[id]
