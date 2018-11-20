import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { normalize } from 'normalizr'

import * as actions from '../index'
import reducer from '../../reducers'
import { newThread, threads } from '../../util/test/data'
import { Thread, Threads } from '../../types/schema'

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

  test('clearErr({KEY}) creates an action that clears an error with the specific key', () => {
    const expectedAction = {
      type: 'CLEAR_ERR',
      key
    }

    expect(actions.clearErr(key)).toEqual(expectedAction)
  })

  test('createReplyRequest() creates an action that starts a create reply request', () => {
    const expectedAction = {
      type: 'CREATE_REPLY_REQUEST'
    }

    expect(actions.createReplyRequest()).toEqual(expectedAction)
  })

  test('createReplySuccess() creates an action that ends a create reply request successfully', () => {
    const expectedAction = {
      type: 'CREATE_REPLY_SUCCESS',
      res: normalize(threads[0], Thread)
    }

    expect(actions.createReplySuccess(threads[0])).toEqual(expectedAction)
  })

  test('createThreadRequest() creates an action that starts a create thread request', () => {
    const expectedAction = {
      type: 'CREATE_THREAD_REQUEST'
    }

    expect(actions.createThreadRequest()).toEqual(expectedAction)
  })

  test('createThreadSuccess() creates an action that ends a create thread request successfully', () => {
    const expectedAction = {
      type: 'CREATE_THREAD_SUCCESS',
      res: normalize(threads[0], Thread)
    }

    expect(actions.createThreadSuccess(threads[0])).toEqual(expectedAction)
  })

  test('fetchEnd() creates an action that ends fetch request', () => {
    const expectedAction = {
      type: 'FETCH_END'
    }

    expect(actions.fetchEnd()).toEqual(expectedAction)
  })

  test('fetchThreadsRequest() creates an action that starts a fetch threads request', () => {
    const expectedAction = {
      type: 'FETCH_THREADS_REQUEST'
    }

    expect(actions.fetchThreadsRequest()).toEqual(expectedAction)
  })

  test('fetchThreadsSuccess({ARRAY}) creates an action that ends threads fetch request successfully', () => {
    const expectedAction = {
      type: 'FETCH_THREADS_SUCCESS',
      res: normalize(threads, Threads)
    }

    expect(actions.fetchThreadsSuccess(threads)).toEqual(expectedAction)
  })

  test('fetchThreadSuccess({OBJECT}) creates an action that ends thread fetch request successfully', () => {
    const expectedAction = {
      type: 'FETCH_THREAD_SUCCESS',
      res: normalize(threads[0], Thread)
    }

    expect(actions.fetchThreadSuccess(threads[0])).toEqual(expectedAction)
  })

  test('setErr({KEY}, {ERR}) creates an action that sets an error', () => {
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
      {
        type: 'CLEAR_ERR',
        key
      },
      {
        type: 'CREATE_REPLY_REQUEST'
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
