const request = require('supertest')

const app = require('../app')
const { db } = require('../util')
const { DB_URI } = require('../config')

beforeAll(() => {
  db.connect(DB_URI)
})

afterAll(() => {
  db.disconnect()
})

describe('Hello world!', () => {
  test('should respond to GET request with 200 and "Hello world!" text', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('Hello world!')
      })
  })
})
