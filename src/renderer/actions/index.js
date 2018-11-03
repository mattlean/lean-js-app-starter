// @flow
import { normalize } from 'normalizr'

import * as api from '../util/mockAPI'
import { arrayOfTodos, todo } from '../types/schema'
import type { Dispatch, ThunkAction, Todo } from '../types'

export const addTodo = (text: string) => (dispatch: Dispatch) =>
  api.addTodo(text).then(response => dispatch({
    type: 'ADD_TODO_SUCCESS',
    response: normalize(response, todo)
  }))

export const fetchTodos = (filter: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  })

  return api.fetchTodos(filter)
    .then(response => dispatch(fetchTodosSuccess(filter, response)))
}

export const fetchTodosSuccess = (filter: string, response: Array<Todo>) => ({
  type: 'FETCH_TODOS_SUCCESS',
  filter,
  response: normalize(response, arrayOfTodos)
})

export const toggleTodo = (id: string) => (dispatch: Dispatch) =>
  api.toggleTodo(id).then(response => dispatch({
    type: 'TOGGLE_TODO_SUCCESS',
    response: normalize(response, todo)
  }))
