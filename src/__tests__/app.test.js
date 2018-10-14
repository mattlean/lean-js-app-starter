const request = require('supertest')

const app = require('../app')
const { db } = require('../util')
const { DB_URI } = require('../config')

beforeAll(() => db.connect(DB_URI))

afterAll(() => db.disconnect())

describe('Hello world!', () => {
  it('should respond to GET request with 200 and "*chan API" text', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('*chan API')
      })
  })
})
