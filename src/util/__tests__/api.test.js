import { getThreads, postReply, postThread } from '../api'

describe('API', () => {
  let thread
  const threadData = {
    subject: 'New Thread',
    comment: 'I am the new thread comment.'
  }


  test('getThreads() lists all threads', () => {
    expect.assertions(1)

    return getThreads().then(res => {
      expect(Array.isArray(res)).toBe(true)
    })
  })

  test('postThread() creates a thread', () => {
    expect.assertions(3)

    return postThread(threadData).then(res => {
      thread = res

      expect(res.subject).toBe(threadData.subject)
      expect(res.comment).toBe(threadData.comment)
      expect(res.type).toBe('Thread')
    })
  })

  test('getThreads(id) reads specific thread', () => {
    expect.assertions(1)

    return getThreads(thread._id).then(res => {
      expect(res._id).toBe(thread._id)
    })
  })

  test('postReply() creates a reply', () => {
    expect.assertions(1)

    const replyData = { comment: 'All your base are belong to us.' }

    return postReply(thread._id, replyData).then(res => {
      expect(res.replies[0].comment).toBe(replyData.comment)
    })
  })
})
