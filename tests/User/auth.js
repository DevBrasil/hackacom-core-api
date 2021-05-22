const request = require('supertest');
const app = require('../../src/app');

const data = require('./data');

let EmailToken;

describe('Authorization', () => {
  beforeAll((done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[2].email,
        password: data.users[2].password,
      })
      .expect((res) => {
        const { body } = res;

        config.userToken = `Bearer ${body.token}`;
      })
      .expect(200, done);
  });

  it('Admin should access restrict content', (done) => {
    request(app)
      .get(`${data.basePath}/`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (!body.data) throw Error('Not returned data');
        if (!body.total) throw Error('Not paginated');

        const user = body.data.pop();

        config.userId = user._id;
      })
      .expect(200, done);
  });

  it('User can`t list users', (done) => {
    request(app)
      .get(`${data.basePath}/`)
      .set('Authorization', config.userToken)
      .expect(403, done);
  });

  it('User can`t get other user', (done) => {
    request(app)
      .get(`${data.basePath}/${config.userId}`)
      .set('Authorization', config.userToken)
      .expect(403, done);
  });

  it('User can`t edit another user', (done) => {
    request(app)
      .put(`${data.basePath}/${config.userId}`)
      .set('Authorization', config.userToken)
      .expect(403, done);
  });

  it('User can`t change another user password', (done) => {
    request(app)
      .put(`${data.basePath}/${config.userId}/password`)
      .set('Authorization', config.userToken)
      .expect(403, done);
  });

  it('User can`t delete another user', (done) => {
    request(app)
      .put(`${data.basePath}/${config.userId}/password`)
      .set('Authorization', config.userToken)
      .expect(403, done);
  });
});
