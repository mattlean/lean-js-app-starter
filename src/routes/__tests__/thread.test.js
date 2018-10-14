const request = require('supertest')

const app = require('../../app')
const { db, test: testUtil } = require('../../util')
const { DB_URI } = require('../../config')

beforeAll(() => {
  testUtil.clearDBCollection('thread')
  db.connect(DB_URI)
})

afterAll(() => {
  testUtil.clearDBCollection('thread')
  db.disconnect()
})

describe('Thread routes', () => {
  let thread
  const threadData = {
    subject: 'Test Thread',
    comment: 'Test Comment'
  }
  const firstReplyData = { comment: 'First Test Reply Comment' }
  const secondReplyData = { comment: 'Second Test Reply Comment' }

  it('should create a thread', () => {
    return request(app)
      .post('/thread')
      .send(threadData)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.subject).toBe(threadData.subject)
        expect(res.body.comment).toBe(threadData.comment)
        expect(res.body.type).toBe('Thread')
        thread = res.body
      })
  })

  it('should list all threads', () => {
    return request(app)
      .get('/thread')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0].subject).toBe(threadData.subject)
        expect(res.body[0].comment).toBe(threadData.comment)
        expect(res.body[0].type).toBe('Thread')
      })
  })

  it('should read specific thread', () => {
    return request(app)
      .get(`/thread/${thread._id}`)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.subject).toBe(threadData.subject)
        expect(res.body.comment).toBe(threadData.comment)
        expect(res.body.type).toBe('Thread')
      })
  })

  it('should create first reply', () => {
    return request(app)
      .post(`/thread/${thread._id}/reply`)
      .send(firstReplyData)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.replies[0].comment).toBe(firstReplyData.comment)
      })
  })

  it('should create second reply and maintain first reply', () => {
    return request(app)
      .post(`/thread/${thread._id}/reply`)
      .send(secondReplyData)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.replies[0].comment).toBe(firstReplyData.comment)
        expect(res.body.replies[1].comment).toBe(secondReplyData.comment)
      })
  })
})
