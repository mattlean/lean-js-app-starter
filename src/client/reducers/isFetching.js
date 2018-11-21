// @flow
import type { Action } from '../types'

export const defaultState = false

const isFetching = (state: boolean = defaultState, action: Action): boolean => {
  switch(action.type) {
    case 'CREATE_THREAD_REQUEST':
    case 'FETCH_THREADS_REQUEST':
      return true
    case 'CREATE_THREAD_SUCCESS':
    case 'FETCH_END':
    case 'FETCH_THREAD_SUCCESS':
    case 'FETCH_THREADS_SUCCESS':
    case 'SET_ERR':
      return false
    default:
      return state
  }
}

export default isFetching
