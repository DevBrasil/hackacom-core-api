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

  it('Should auto-register the first user as admin', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send(data.users[0])
      .expect(res => {
        const { body } = res

        if(!body.token) throw Error('Auto-register error')
        
        config.adminToken = `Bearer ${body.token}`
      })
      .expect(200, done)
  })

  it('Should not auto-register the second admin user', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send(data.users[1])
      .expect(401, done)
  })

  it('Should register an user', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.users[1])
      .expect(201, done)
  })

  it('Should register second user', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.users[2])
      .expect(201, done)
  })

  it('Should register third user', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.users[3])
      .expect(201, done)
  })

  it('Should not register two users with same email', (done) => {
    request(app)
      .post(`${data.basePath}/`)
      .send(data.users[0])
      .expect(403, done)
  })
})