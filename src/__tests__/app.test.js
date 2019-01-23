const request = require('supertest')

const app = require('../app')

describe('Root endpoint', () => {
  it('should respond to GET request with 200 and "*chan API" text', () => {
    return request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe('*chan API')
      })
  })
})
