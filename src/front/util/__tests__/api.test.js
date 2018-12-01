import { getThreads, postReply, postThread } from '../api'
import { newThread, threads } from '../../util/test/data'

describe('API', () => {
  let thread

  test('getThreads() lists all threads', () => {
    expect.assertions(1)

    return getThreads().then(res => {
      expect(Array.isArray(res)).toBe(true)
    })
  })

  test('postThread({DATA}) creates a thread', () => {
    expect.assertions(3)

    return postThread(newThread).then(res => {
      thread = res

      expect(res.subject).toBe(newThread.subject)
      expect(res.comment).toBe(newThread.comment)
      expect(res.type).toBe('Thread')
    })
  })

  test('getThreads({ID}) reads specific thread', () => {
    expect.assertions(1)

    return getThreads(thread._id).then(res => {
      expect(res._id).toBe(thread._id)
    })
  })

  test('postReply() creates a reply', () => {
    expect.assertions(1)

    const replyData = { comment: threads[0].replies[0].comment }

    return postReply(thread._id, replyData).then(res => {
      expect(res.replies[0].comment).toBe(replyData.comment)
    })
  })
})
