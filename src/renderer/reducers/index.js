// @flow
import { combineReducers } from 'redux'

import byId, { getTodo } from './byId'
import createList, { getIds } from './createList'
import type { State } from '../types'

const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
})

const todos = combineReducers({
  byId,
  listByFilter
})

export default todos

export const getVisibleTodos = (state: State, filter: string) => {
  if(state.listByFilter && state.byId) {
    const ids = getIds(state.listByFilter[filter])
    if(ids) {
      return ids.map(id => {
        if(state.byId) return getTodo(state.byId, id)
      })
    }
  }
}
