const request = require('supertest');
const app = require('../../src/app');

const data = require('./data');

let user, disabled_user;

describe('Manage Users', () => {
  it('Admin should list all users', (done) => {
    request(app)
      .get(`${data.basePath}/`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (!body.data) throw Error('Not returned data');
        if (!body.total) throw Error('Not paginated');

        user = body.data.pop();
        disabled_user = body.data.pop();
      })
      .expect(200, done);
  });

  it('Should paginate users', (done) => {
    request(app)
      .get(`${data.basePath}?perPage=1&page=2`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (body.data.length != 1) throw Error('Not Paginated');
      })
      .expect(200, done);
  });

  it('Should select a specific field', (done) => {
    request(app)
      .get(`${data.basePath}?fields=name`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if(Object.keys(body.data[0]).length != 2) throw Error('Return more fields');
      })
      .expect(200, done);
  });

  it('Admin should get other user', (done) => {
    request(app)
      .get(`${data.basePath}/${user._id}`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (body._id != user._id) throw Error('Not same user');
      })
      .expect(200, done);
  });

  it('Admin should edit another user', (done) => {
    request(app)
      .put(`${data.basePath}/${user._id}`)
      .send({ name: 'Edited user' })
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (body.name != 'Edited user') throw Error('Not edited');
      })
      .expect(200, done);
  });

  it('Admin should edit another user role', (done) => {
    request(app)
      .put(`${data.basePath}/${disabled_user._id}`)
      .send({ role: 'admin' })
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (body.role != 'admin') throw Error('Not edited');
      })
      .expect(200, done);
  });

  it('Admin should change another user password', (done) => {
    request(app)
      .put(`${data.basePath}/${user._id}/password`)
      .send({ password: 'password_by_admin' })
      .set('Authorization', config.adminToken)
      .expect(200, done);
  });

  it('Did change the password', (done) => {
    request(app)
      .post(`${data.basePath}/login`)
      .send({
        email: user.email,
        password: 'password_by_admin',
      })
      .expect(200, done);
  });

  it('Admin should deactivate another user', (done) => {
    request(app)
      .put(`${data.basePath}/${disabled_user._id}`)
      .send({ active: false })
      .set('Authorization', config.adminToken)
      .expect(200, done);
  });

  it('Should user be disabled', (done) => {
    request(app)
      .get(`${data.basePath}/${disabled_user._id}`)
      .set('Authorization', config.adminToken)
      .expect((res) => {
        const { body } = res;

        if (body.active) throw Error('Still Active');
      })
      .expect(200, done);
  });

  it('Admin should delete another user', (done) => {
    request(app)
      .delete(`${data.basePath}/${user._id}`)
      .set('Authorization', config.adminToken)
      .expect(200, done);
  });

  it('Should user be deleted', (done) => {
    request(app)
      .get(`${data.basePath}/${user._id}`)
      .set('Authorization', config.adminToken)
      .expect(404, done);
  });
});
