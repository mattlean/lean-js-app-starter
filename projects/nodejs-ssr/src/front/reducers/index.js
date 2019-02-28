// @flow
import { combineReducers } from 'redux'

import byId, { getThread as byIdGetThread } from './byId'
import err from './err'
import isFetching from './isFetching'
import list from './list'
import type { State, Thread } from '../types'

const rootReducer = combineReducers({
  byId,
  err,
  isFetching,
  list
})

export default rootReducer

export const getThread = (state: State, id: string): ?Thread => {
  if(state.byId) {
    return byIdGetThread(state.byId, id)
  }
}

export const getThreads = (state: State): ?Array<?Thread> => {
  if(state.list) {
    return state.list.map(id => getThread(state, id))
  }
}
