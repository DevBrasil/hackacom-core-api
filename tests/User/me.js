const request = require('supertest');
const app = require('../../src/app');

const data = require('./data');

describe('Session user', () => {
  it('Should not accept invalid credentials', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[1].email,
        password: 'wrong_pass',
      })
      .expect(401, done);
  });

  it('Should receive JWT token when authenticated with valid credentials', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[1].email,
        password: data.users[1].password,
      })
      .expect((res) => {
        const { body } = res;

        config.userToken = `Bearer ${body.token}`;
      })
      .expect(200, done);
  });

  it('Should return logged user', (done) => {
    request(app)
      .get(`${data.basePath}/me`)
      .set('Authorization', config.userToken)
      .expect((res) => {
        const { body } = res;

        if (
          body.name != data.users[1].name ||
          body.email != data.users[1].email
        )
          throw Error('Wrong user');
        if (body.password) throw Error('Should not return the password');
      })
      .expect(200, done);
  });

  it('Should edit the logged user', (done) => {
    request(app)
      .put(`${data.basePath}/me`)
      .send({ name: 'John Name', email: 'john@email.com', role: 'admin' })
      .set('Authorization', config.userToken)
      .expect((res) => {
        const { body } = res;

        if (body.name != 'John Name') throw Error('User name has not been updated');
        
        if (body.email != data.users[1].email) throw Error('E-mail should not be updated');
        if (body.role != 'user') throw Error('Role should not be updated');
      })
      .expect(200, done);
  });

  it('Should update the password', (done) => {
    request(app)
      .put(`${data.basePath}/me/password`)
      .send({ current: data.users[1].password, password: 'new_password' })
      .set('Authorization', config.userToken)
      .expect(200, done);
  });

  it('Should validate if current password is correct', (done) => {
    request(app)
      .put(`${data.basePath}/me/password`)
      .send({ current: 'wrong_pass', password: 'new_password' })
      .set('Authorization', config.userToken)
      .expect(403, done);
  });

  it('Did update the password', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[1].email,
        password: 'new_password',
      })
      .expect(200, done);
  });

  it('Should request a email for recover password', (done) => {
    request(app)
      .post(`${data.basePath}/forgot`)
      .send({
        email: data.users[1].email,
        device: 'web',
      })
      .expect((res) => {
        const {
          body: { token },
        } = res;

        EmailToken = token;
      })
      .expect(200, done);
  });

  it("Should get the same response if user doesn't exists", (done) => {
    request(app)
      .post(`${data.basePath}/forgot`)
      .send({
        email: 'emailNotExists@gmail.com',
        device: 'ios',
      })
      .expect(200, done);
  });

  it('Should recover password with token received by email', (done) => {
    request(app)
      .post(`${data.basePath}/recover`)
      .send({
        token: EmailToken,
        password: 'recovered_password',
      })
      .expect(200, done);
  });

  it('Did update the password', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[1].email,
        password: 'recovered_password',
      })
      .expect(200, done);
  });

  it('Should delete the user', (done) => {
    request(app)
      .delete(`${data.basePath}/me`)
      .set('Authorization', config.userToken)
      .expect(200, done);
  });

  it('Did delete the user', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: data.users[1].email,
        password: 'new_password',
      })
      .expect(401, done);
  });
});
