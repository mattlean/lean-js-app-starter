// @flow
import type { Action, State_ById } from '../types'

const byId = (state: State_ById = {}, action: Action): State_ById => {
  switch(action.type) {
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
