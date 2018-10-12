// @flow
import { normalize } from 'normalizr'

import { getThreads } from '../util/api'
import { Thread, Threads } from '../types/schema'
import type { Dispatch, ThunkAction } from '../types'

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
