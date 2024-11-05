// @flow
import type { Dispatch as ReduxDispatch } from "redux";

export type Action =
  | Action_AddTodoSuccess
  | Action_FetchTodosFailure
  | Action_FetchTodosRequest
  | Action_FetchTodosSuccess
  | Action_ToggleTodoSuccess;

export type Action_FetchTodosFailure = {|
  type: "FETCH_TODOS_FAILURE",
  filter: string,
  message: string,
|};

export type Action_AddTodoSuccess = {|
  type: "ADD_TODO_SUCCESS",
  response: NormalizedRes,
|};

export type Action_FetchTodosRequest = {|
  type: "FETCH_TODOS_REQUEST",
  filter: string,
|};

export type Action_FetchTodosSuccess = {|
  type: "FETCH_TODOS_SUCCESS",
  filter: string,
  response: NormalizedRes,
|};

export type Action_ToggleTodoSuccess = {|
  type: "TOGGLE_TODO_SUCCESS",
  response: NormalizedRes,
|};

export type Dispatch = ReduxDispatch<Action> & ((action: ThunkAction) => any);

export type GetState = () => State;

export type NormalizedRes = {
  entities: {
    todos: {
      [string]: Todo,
    },
  },
  result: string | Array<string>,
};

export type State =
  | {|
      +byId: State_ById,
      +listByFilter: State_ListByFilter,
    |}
  | {||};

export type State_ById =
  | {
      +[string]: Todo,
    }
  | {||};

export type State_List_ErrorMessage = string | null;

export type State_ListByFilter =
  | {|
      +all: State_List,
      +active: State_List,
      +completed: State_List,
    |}
  | {||};

export type State_List_IsFetching = boolean;

export type State_List =
  | {
      +errorMessage: State_List_ErrorMessage,
      +ids: State_List_Ids,
      +isFetching: State_List_IsFetching,
    }
  | {||};

export type State_List_Ids = Array<string>;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Todo = {
  id: string,
  text: string,
  completed: boolean,
};
