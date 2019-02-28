import reducer, { defaultState, getThread } from '../byId'
import { createReplySuccess, createThreadSuccess, fetchThreadsSuccess, fetchThreadSuccess } from '../../actions'
import { threads } from '../../util/test/data'

describe('byId reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle CREATE_REPLY_SUCCESS', () => {
    const action = createReplySuccess(threads[0])
    const state = reducer(defaultState, action)

    expect(state).toEqual(action.res.entities.threads)
  })

  it('should handle CREATE_THREAD_SUCCESS', () => {
    const action = createThreadSuccess(threads[0])
    const state = reducer(defaultState, action)

    expect(state).toEqual(action.res.entities.threads)
  })

  it('should handle FETCH_THREAD_SUCCESS', () => {
    const action = fetchThreadSuccess(threads[0])
    const state = reducer(defaultState, action)

    expect(state).toEqual(action.res.entities.threads)
  })

  it('should handle FETCH_THREADS_SUCCESS', () => {
    const action = fetchThreadsSuccess(threads)
    const state = reducer(defaultState, action)

    expect(state).toEqual(action.res.entities.threads)
  })
})

describe('byId selector', () => {
  test('getThread() should return thread', () => {
    const thread = threads[0]
    const action = fetchThreadsSuccess(threads)
    const state = reducer(defaultState, action)

    expect(getThread(state, thread._id)).toEqual(thread)
  })

  test('getTodo() should return undefined when todo is not found', () => {
    const state = reducer(defaultState, {})

    expect(getThread(state, '123')).toEqual(undefined)
  })
})
