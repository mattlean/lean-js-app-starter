import { getThreads, postThreads } from '../api'

describe('API', () => {
  const threadData = {
    subject: 'New Thread',
    comment: 'I am the new thread comment.'
  }

  let thread

  test('getThreads() lists all threads', () => {
    expect.assertions(1)

    return getThreads().then(res => {
      expect(Array.isArray(res)).toBe(true)
    })
  })

  test('postThreads() creates a thread', () => {
    expect.assertions(3)

    return postThreads(threadData).then(res => {
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
})
