import reducer, { defaultState } from '../isFetching'
import { createThreadRequest, createThreadSuccess, fetchEnd, fetchThreadsRequest, fetchThreadSuccess, fetchThreadsSuccess, setErr } from '../../actions'
import { threads } from '../../util/test/data'

describe('err reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle CREATE_THREAD_REQUEST', () => {
    const action = createThreadRequest()
    const state = reducer(defaultState, action)

    expect(state).toEqual(true)
  })

  it('should handle FETCH_THREADS_REQUEST', () => {
    const action = fetchThreadsRequest()
    const state = reducer(defaultState, action)

    expect(state).toEqual(true)
  })

  it('should handle CREATE_THREAD_SUCCESS', () => {
    const action = createThreadSuccess(threads[0])
    const state = reducer(defaultState, action)

    expect(state).toEqual(false)
  })

  it('should handle FETCH_END', () => {
    const action = fetchEnd()
    const state = reducer(defaultState, action)

    expect(state).toEqual(false)
  })

  it('should handle FETCH_THREAD_SUCCESS', () => {
    const action = fetchThreadSuccess(threads[0])
    const state = reducer(defaultState, action)

    expect(state).toEqual(false)
  })

  it('should handle FETCH_THREADS_SUCCESS', () => {
    const action = fetchThreadsSuccess(threads)
    const state = reducer(defaultState, action)

    expect(state).toEqual(false)
  })

  it('should handle SET_ERR', () => {
    const action = setErr('create', new Error('Boom!'))
    const state = reducer(defaultState, action)

    expect(state).toEqual(false)
  })
})
