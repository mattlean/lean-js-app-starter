// @flow
import HTTPErr from '../util/HTTPErr'
import type { Dispatch as ReduxDispatch } from 'redux'

export type Action =
  | Action_ClearAllErrs
  | Action_ClearErr
  | Action_CreateReplyRequest
  | Action_CreateReplySuccess
  | Action_CreateThreadRequest
  | Action_CreateThreadSuccess
  | Action_FetchEnd
  | Action_FetchThreadsRequest
  | Action_FetchThreadSuccess
  | Action_FetchThreadsSuccess
  | Action_SetErr

export type Action_ClearAllErrs = {|
  type: 'CLEAR_ALL_ERRS'
|}

export type Action_ClearErr = {|
  type: 'CLEAR_ERR',
  key: string
|}

export type Action_CreateReplyRequest = {|
  type: 'CREATE_REPLY_REQUEST'
|}

export type Action_CreateReplySuccess = {|
  type: 'CREATE_REPLY_SUCCESS',
  res: NormalizedRes
|}

export type Action_CreateThreadRequest = {|
  type: 'CREATE_THREAD_REQUEST'
|}

export type Action_CreateThreadSuccess = {|
  type: 'CREATE_THREAD_SUCCESS',
  res: NormalizedRes
|}

export type Action_FetchEnd = {|
  type: 'FETCH_END'
|}

export type Action_FetchThreadsRequest = {|
  type: 'FETCH_THREADS_REQUEST'
|}

export type Action_FetchThreadSuccess = {|
  type: 'FETCH_THREAD_SUCCESS',
  res: NormalizedRes
|}

export type Action_FetchThreadsSuccess = {|
  type: 'FETCH_THREADS_SUCCESS',
  res: NormalizedRes
|}

export type Action_SetErr = {|
  type: 'SET_ERR',
  key: string,
  err: HTTPErr
|}

export type ActionCreator_FetchThreads = () => ThunkAction

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

export type Reply = {|
  _id: string,
  createdAt: Date,
  comment: string
|}

export type ReplyData = {|
  comment: string
|}

export type State = {|
  +byId: State_ById,
  +err: State_Err,
  +isFetching: boolean,
  +list: State_List
|} | {||}

export type State_ById = {
  +[string]: Thread
} | {||}

export type State_Err = {
  +[string]: HTTPErr
} | {||}

export type State_List = Array<string>

export type Thread = {|
  _id: string,
  createdAt: Date,
  subject?: string,
  comment: string,
  replies?: Array<Reply>
|}

export type ThreadData = {|
  subject?: string,
  comment: string
|}

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
