// @flow
import type { Action, Thread } from '../types'

export const defaultState = []

const list = (state: Array<Thread> = defaultState, action: Action) => {
  switch(action.type) {
    case 'FETCH_THREADS_SUCCESS':
      return action.res.result
    default:
      return state
  }
}

export default list
