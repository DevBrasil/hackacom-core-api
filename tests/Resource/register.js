const request = require("supertest");
const app = require("../../src/app");

const data = require('./data')

describe('User Registration', () => {
  it('Should validate body', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send({})
      .expect(400, done)
  })

  it('Should register a resource', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.resources[0])
      .expect(201, done)
  })

  it('Should register second resource', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.resources[1])
      .expect(201, done)
  })

  it('Should register third resource', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.resources[2])
      .expect(201, done)
  })

  it('Should register forth resource', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.resources[3])
      .expect(201, done)
  })
})