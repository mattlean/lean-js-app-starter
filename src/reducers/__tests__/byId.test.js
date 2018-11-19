import reducer, { defaultState, getThread } from '../byId'
import { fetchThreadsSuccess } from '../../actions'
import { threads } from '../../util/test/data'

describe('byId reducer', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})

    expect(state).toEqual(defaultState)
  })

  it('should handle action res', () => {
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
