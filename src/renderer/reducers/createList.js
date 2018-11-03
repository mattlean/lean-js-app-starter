// @flow
import { combineReducers } from 'redux'

import type { Action, State_List, State_List_Ids } from '../types'

const createList = (filter: string) => {
  const ids = (state: State_List_Ids = [], action: Action) => {
    switch(action.type) {
      case 'ADD_TODO_SUCCESS':
        return filter !== 'completed' ? [...state, action.response.result] : state
      case 'FETCH_TODOS_SUCCESS':
        return filter === action.filter ? action.response.result : state
      default:
        return state
    }
  }

  return combineReducers({
    ids
  })
}

export default createList

export const getIds = (state: State_List) => {
  if(state.ids) return state.ids
}
