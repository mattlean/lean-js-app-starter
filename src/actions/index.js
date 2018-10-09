// @flow
import { normalize } from 'normalizr'

import { getThreads } from '../util/api'
import { Threads } from '../types/schema'
import type { Dispatch, ThunkAction } from '../types'

export const fetchThreads = (): ThunkAction => (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_THREADS_REQUEST' })

  return getThreads().then(res => {
    dispatch({
      type: 'FETCH_THREADS_SUCCESS',
      res: normalize(res, Threads)
    })
  })
}
