const request = require('supertest');
const app = require('../../src/app');

const data = require('./data');

let resource
describe('Manage resources', () => {
  it('Should list all resources', (done) => {
    request(app)
      .get(`${data.basePath}/`)
      .expect((res) => {
        const { body } = res;

        if (!body.data) throw Error('Not returned data');
        if (!body.total) throw Error('Not paginated');

        resource = body.data.pop();
      })
      .expect(200, done);
  });

  it('Should paginate resources', (done) => {
    request(app)
      .get(`${data.basePath}?perPage=1`)
      .expect((res) => {
        const { body } = res;

        if (body.data.length != 1) throw Error('Not Paginated');
      })
      .expect(200, done);
  });

  it('Should select a specific field', (done) => {
    request(app)
      .get(`${data.basePath}?fields=name`)
      .expect((res) => {
        const { body } = res;

        if(Object.keys(body.data[0]).length != 2) throw Error('Return more fields');
      })
      .expect(200, done);
  });

  it('Should get a resource', (done) => {
    request(app)
      .get(`${data.basePath}/${resource._id}`)
      .expect((res) => {
        const { body } = res;

        if (body._id != resource._id) throw Error('Not same resource');
      })
      .expect(200, done);
  });

  it('Should get a resource', (done) => {
    request(app)
      .get(`${data.basePath}/usinginvalid`)
      .expect(404, done);
  });

  it('Should edit a resource', (done) => {
    request(app)
      .put(`${data.basePath}/${resource._id}`)
      .send({ name: 'Edited resource' })
      .expect((res) => {
        const { body } = res;

        if (body.name != 'Edited resource') throw Error('Not edited');
      })
      .expect(200, done);
  });

  it('Should delete a resource', (done) => {
    request(app)
      .delete(`${data.basePath}/${resource._id}`)
      .expect(200, done);
  });

  it('Should resource be deleted', (done) => {
    request(app)
      .get(`${data.basePath}/${resource._id}`)
      .expect(404, done);
  });
});
