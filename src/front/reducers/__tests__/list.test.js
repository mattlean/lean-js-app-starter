import reducer, { defaultState } from '../list'
import { fetchThreadsSuccess } from '../../actions'
import { threads } from '../../util/test/data'

describe('list reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle FETCH_THREADS_SUCCESS', () => {
    const action = fetchThreadsSuccess(threads)
    const state = reducer(defaultState, action)

    expect(state).toEqual(threads.map(thread => thread._id))
  })
})
