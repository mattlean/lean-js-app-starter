import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as actions from '../index'
import reducer from '../../reducers'
import { newThread, threads } from '../../util/test/data'

describe('actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  const key = 'create'
  let thread

  test('clearAllErrs() creates an action that clears all errors', () => {
    const expectedAction = {
      type: 'CLEAR_ALL_ERRS'
    }

    expect(actions.clearAllErrs()).toEqual(expectedAction)
  })

  test('clearErr(\'{KEY}\') creates an action that clears an error with the specific key', () => {
    const expectedAction = {
      type: 'CLEAR_ERR',
      key
    }

    expect(actions.clearErr(key)).toEqual(expectedAction)
  })

  test('endFetch() creates an action that ends fetch request', () => {
    const expectedAction = {
      type: 'FETCH_END'
    }

    expect(actions.endFetch()).toEqual(expectedAction)
  })

  test('setErr() creates an action that sets an error', () => {
    const expectedAction = {
      type: 'SET_ERR',
      key
    }
    const store = mockStore(reducer(undefined, {}))

    store.dispatch(actions.setErr(key, new Error('Boom!')))
    const receivedAction = store.getActions()[0]

    expect(receivedAction.type).toEqual(expectedAction.type)
    expect(receivedAction.key).toEqual(expectedAction.key)
  })

  test('fetchThreads() lists all threads', () => {
    const expectedActions = [
      {
        type: 'FETCH_THREADS_REQUEST',
      },
      {
        type: 'FETCH_THREADS_SUCCESS'
      }
    ]
    const store = mockStore(reducer(undefined, {}))

    return store.dispatch(actions.fetchThreads()).then(res => {
      const receivedActions = store.getActions()
      expect(receivedActions[0].type).toBe(expectedActions[0].type)
      expect(receivedActions[1].type).toBe(expectedActions[1].type)
      expect(Array.isArray(res)).toBe(true)
    })
  })

  test('createThread({DATA}) creates a thread', () => {
    const expectedActions = [
      actions.clearErr(key),
      {
        type: 'CREATE_THREAD_REQUEST',
      },
      {
        type: 'CREATE_THREAD_SUCCESS'
      }
    ]
    const store = mockStore(reducer(undefined, {}))

    return store.dispatch(actions.createThread(newThread)).then(res => {
      const receivedActions = store.getActions()
      thread = res

      expect(receivedActions[0]).toEqual(expectedActions[0])
      expect(receivedActions[1]).toEqual(expectedActions[1])
      expect(receivedActions[2].type).toBe(expectedActions[2].type)
      expect(res.subject).toBe(newThread.subject)
      expect(res.comment).toBe(newThread.comment)
      expect(res.type).toBe('Thread')
    })
  })

  test('fetchThreads({ID}) reads specific thread', () => {
    const expectedActions = [
      {
        type: 'FETCH_THREADS_REQUEST'
      },
      {
        type: 'FETCH_THREAD_SUCCESS',
      }
    ]
    const store = mockStore(reducer(undefined, {}))

    return store.dispatch(actions.fetchThreads(thread._id)).then(res => {
      const receivedActions = store.getActions()
      expect(receivedActions[0]).toEqual(expectedActions[0])
      expect(receivedActions[1].type).toBe(expectedActions[1].type)
      expect(res._id).toBe(thread._id)
    })
  })

  test('createReply({ID}, {DATA}) creates a reply', () => {
    const expectedActions = [
      actions.clearErr(key),
      {
        type: 'CREATE_REPLY_REQUEST',
      },
      {
        type: 'CREATE_REPLY_SUCCESS'
      }
    ]
    const replyData = { comment: threads[0].replies[0].comment }
    const store = mockStore(reducer(undefined, {}))

    return store.dispatch(actions.createReply(thread._id, replyData)).then(res => {
      const receivedActions = store.getActions()
      thread = res

      expect(receivedActions[0]).toEqual(expectedActions[0])
      expect(receivedActions[1].type).toBe(expectedActions[1].type)
      expect(res.subject).toBe(newThread.subject)
      expect(res.comment).toBe(newThread.comment)
      expect(res.replies[0].comment).toBe(replyData.comment)
      expect(res.type).toBe('Thread')
    })
  })
})
