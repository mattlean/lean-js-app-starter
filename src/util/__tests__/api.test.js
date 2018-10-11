import { getThreads, postThreads } from '../api'

describe('API', () => {
  test('getThreads() lists all threads', () => {
    expect.assertions(1)

    return getThreads().then(res => {
      expect(Array.isArray(res)).toBe(true)
    })
  })

  test('postThreads() creates a thread', () => {
    expect.assertions(3)

    const threadData = {
      subject: 'New Thread',
      comment: 'I am the new thread comment.'
    }

    return postThreads(threadData).then(res => {
      expect(res.subject).toBe(threadData.subject)
      expect(res.comment).toBe(threadData.comment)
      expect(res.type).toBe('Thread')
    })
  })
})
