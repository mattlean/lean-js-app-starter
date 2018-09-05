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
  const data = {
    _id: 1,
    subject: 'Test Thread',
    comment: 'Test Comment'
  }

  test('should create a thread', () => {
    return request(app)
      .post('/thread')
      .send(data)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.subject).toBe(data.subject)
        expect(res.body.comment).toBe(data.comment)
        thread = res.body
      })
  })

  test('should list all threads', () => {
    return request(app)
      .get('/thread')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toBeInstanceOf(Array)
      })
  })

  test('should read specific thread', () => {
    return request(app)
      .get(`/thread/${thread._id}`)
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.body.subject).toBe(data.subject)
        expect(res.body.comment).toBe(data.comment)
      })
  })
})
