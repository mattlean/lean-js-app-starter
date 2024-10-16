// @flow
import { normalize } from 'normalizr'

import { getIsFetching } from '../reducers'
import type { Dispatch, ThunkAction, Todo } from '../types'
import { arrayOfTodos, todo } from '../types/schema'
import * as api from '../util/mockAPI'

export const addTodo = (text: string) => (dispatch: Dispatch) =>
    api.addTodo(text).then((response) =>
        dispatch({
            type: 'ADD_TODO_SUCCESS',
            response: normalize(response, todo),
        }),
    )

export const fetchTodos =
    (filter: string): ThunkAction =>
    (dispatch: Dispatch, getState) => {
        if (getIsFetching(getState(), filter)) {
            return Promise.resolve()
        }

        dispatch(fetchTodosRequest(filter))

        return api.fetchTodos(filter).then(
            (response) => {
                return dispatch(fetchTodosSuccess(filter, response))
            },
            (error) => {
                return dispatch(fetchTodosFailure(filter, error.message))
            },
        )
    }

export const fetchTodosFailure = (
    filter: string,
    message: string = 'Something went wrong.',
) => ({
    type: 'FETCH_TODOS_FAILURE',
    filter,
    message,
})

export const fetchTodosRequest = (filter: string) => ({
    type: 'FETCH_TODOS_REQUEST',
    filter,
})

export const fetchTodosSuccess = (filter: string, response: Array<Todo>) => ({
    type: 'FETCH_TODOS_SUCCESS',
    filter,
    response: normalize(response, arrayOfTodos),
})

export const toggleTodo = (id: string) => (dispatch: Dispatch) =>
    api.toggleTodo(id).then((response) =>
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, todo),
        }),
    )
