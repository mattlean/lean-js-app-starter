// @flow
import { normalize } from 'normalizr'

import HTTPErr from '../util/HTTPErr'
import { getThreads, postReply, postThread } from '../util/api'
import { Thread, Threads } from '../types/schema'
import type { Action_ClearErr, Dispatch, ThreadData, ReplyData, ThunkAction } from '../types'

export const clearErr = (): Action_ClearErr => ({ type: 'CLEAR_ERR' })

export const createReply = (id: string, data: ReplyData): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'CREATE_REPLY_REQUEST' })

  return postReply(id, data).then(res => {
    dispatch({
      type: 'CREATE_THREAD_SUCCESS',
      res: normalize(res, Thread)
    })

    return res
  })
}

export const createThread = (data: ThreadData): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'CREATE_THREAD_REQUEST' })

  return postThread(data).then(res => {
    dispatch({
      type: 'CREATE_THREAD_SUCCESS',
      res: normalize(res, Thread)
    })

    return res
  })
}

export const fetchThreads = (id?: string): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_THREADS_REQUEST' })

  if(id) {
    return getThreads(id).then(res => {
      dispatch({
        type: 'FETCH_THREAD_SUCCESS',
        res: normalize(res, Thread)
      })

      return res
    })
  }
  return getThreads().then(res => {
    dispatch({
      type: 'FETCH_THREADS_SUCCESS',
      res: normalize(res, Threads)
    })

    return res
  })
}

export const setErr = (err: HTTPErr): ThunkAction => (dispatch: Dispatch) => {
  dispatch({
    type: 'SET_ERR',
    err
  })
}
