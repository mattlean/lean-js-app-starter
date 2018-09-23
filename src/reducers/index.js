// @flow
import { combineReducers } from 'redux'
import type { State } from 'redux'

import todos, * as fromTodos from './todos'

export const todoApp = combineReducers({
  todos
})

export const getVisibleTodos = (state: State, filter: string) => fromTodos.getVisibleTodos(state.todos, filter)
