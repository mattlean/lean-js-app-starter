// @flow
import type { Action } from '../types'

const isFetching = (state: boolean = false, action: Action): boolean => {
  switch(action.type) {
    case 'CREATE_THREAD_REQUEST':
    case 'FETCH_THREADS_REQUEST':
      return true
    case 'CREATE_THREAD_SUCCESS':
    case 'FETCH_THREAD_SUCCESS':
    case 'FETCH_THREADS_SUCCESS':
      return false
    default:
      return state
  }
}

export default isFetching
