// @flow
import type { Dispatch as ReduxDispatch } from 'redux'

export type Action =
  | Action_AddTodoSuccess
  | Action_FetchTodosRequest
  | Action_FetchTodosSuccess
  | Action_ToggleTodoSuccess

export type Action_AddTodoSuccess = {|
  type: 'ADD_TODO_SUCCESS',
  response: NormalizedRes
|}

export type Action_FetchTodosRequest = {|
  type: 'FETCH_TODOS_REQUEST',
  filter: string
|}

export type Action_FetchTodosSuccess = {|
  type: 'FETCH_TODOS_SUCCESS',
  filter: string,
  response: NormalizedRes
|}

export type Action_ToggleTodoSuccess = {|
  type: 'TOGGLE_TODO_SUCCESS',
  response: NormalizedRes
|}

export type Dispatch = ReduxDispatch<Action> & (action: ThunkAction) => any

export type GetState = () => State

export type NormalizedRes = {
  entities: {
    [string]: {
      [string]: any
    }
  },
  result: string | Array<string>
}

export type State = {|
  +byId: State_ById,
  +listByFilter: State_ListByFilter
|} | {||}

export type State_ById = {
  +[string]: Todo
} | {||}

export type State_ListByFilter = {|
  +all: State_List
|} | {||}

export type State_List = {
  +ids: State_List_Ids
} | {||}

export type State_List_Ids = Array<string>

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any

export type Todo = {
  id: string,
  text: string,
  completed: boolean
}
