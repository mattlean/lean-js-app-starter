// @flow
import { normalize } from 'normalizr'

import HTTPErr from '../util/HTTPErr'
import { getThreads, postReply, postThread } from '../util/api'
import { Thread as ThreadSchema, Threads as ThreadsSchema } from '../types/schema'
import type { Action_ClearAllErrs, Action_ClearErr, Action_FetchEnd, Dispatch, Thread, ThreadData, ReplyData, ThunkAction } from '../types'

export const clearAllErrs = (): Action_ClearAllErrs => ({
  type: 'CLEAR_ALL_ERRS'
})

export const clearErr = (key: string): Action_ClearErr => ({
  type: 'CLEAR_ERR',
  key
})

export const createReply = (id: string, data: ReplyData): ThunkAction => (dispatch: Dispatch) => {
  dispatch(clearErr('create'))
  dispatch(createReplyRequest())

  return postReply(id, data).then(res => {
    dispatch(createReplySuccess(res))

    return res
  })
}

export const createReplyRequest = () => ({
  type: 'CREATE_REPLY_REQUEST'
})

export const createReplySuccess = (res: Thread) => ({
  type: 'CREATE_REPLY_SUCCESS',
  res: normalize(res, ThreadSchema)
})

export const createThread = (data: ThreadData): ThunkAction => (dispatch: Dispatch) => {
  dispatch(clearErr('create'))
  dispatch(createThreadRequest())

  return postThread(data).then(res => {
    dispatch(createThreadSuccess(res))

    return res
  })
}

export const createThreadRequest = () => ({
  type: 'CREATE_THREAD_REQUEST'
})

export const createThreadSuccess = (res: Thread) => ({
  type: 'CREATE_THREAD_SUCCESS',
  res: normalize(res, ThreadSchema)
})

export const fetchEnd = (): Action_FetchEnd => ({
  type: 'FETCH_END'
})

export const fetchThreadsRequest = () => ({
  type: 'FETCH_THREADS_REQUEST'
})

export const fetchThreads = (id?: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch(fetchThreadsRequest())

  if(id) {
    return getThreads(id).then(res => {
      dispatch(fetchThreadSuccess(res))

      return res
    })
  }
  return getThreads().then(res => {
    dispatch(fetchThreadsSuccess(res))

    return res
  })
}

export const fetchThreadsSuccess = (res: Array<Thread>) => ({
  type: 'FETCH_THREADS_SUCCESS',
  res: normalize(res, ThreadsSchema)
})

export const fetchThreadSuccess = (res: Thread) => ({
  type: 'FETCH_THREAD_SUCCESS',
  res: normalize(res, ThreadSchema)
})

export const setErr = (key: string, err: HTTPErr) => ({
  type: 'SET_ERR',
  key,
  err
})
