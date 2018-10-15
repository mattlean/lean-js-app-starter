// @flow
import type { Action, Thread } from '../types'

const list = (state: Array<Thread> = [], action: Action) => {
  switch(action.type) {
    case 'FETCH_THREADS_SUCCESS':
      return action.res.result
    default:
      return state
  }
}

export default list
