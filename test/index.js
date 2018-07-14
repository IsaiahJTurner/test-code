import request from 'supertest';

describe('thing', () => {
  let server;
  beforeEach(() => {
    // eslint-disable-next-line global-require
    server = require('../index.js');
  });
  afterEach(() => server.close());
  it('create', (done) => {
    request(server).post('/things').expect(201, done);
  });
  it('get one (by ID)', (done) => {
    request(server).get('/things/1').expect(200, done);
  });
  it('get all', (done) => {
    request(server).get('/things').expect(200, done);
  });
  it('delete', (done) => {
    request(server).delete('/things/1').expect(204, done);
  });
});
