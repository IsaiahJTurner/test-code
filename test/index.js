import request from 'supertest';
import _ from 'lodash';

describe('thing', () => {
  let server;
  let thingId;
  // eslint-disable-next-line global-require
  beforeEach(() => require('../index.js').then((newServer) => {
    server = newServer;
  }));
  afterEach(() => server.close());
  it('create', (done) => {
    request(server)
      .post('/things')
      .send({
        title: 'Some title',
        author: 'Some author',
        content: 'Some description',
      })
      .expect((res) => {
        if (!_.isNumber(res.body.id)) throw new Error('Missing ID');
        thingId = res.body.id;
        res.body.title = 'Some title';
        res.body.author = 'Some author';
        res.body.content = 'Some content';
      })
      .expect(201, done);
  });
  it('get one (by ID)', (done) => {
    request(server)
      .get(`/things/${thingId}`)
      .expect((res) => {
        res.body.id = thingId;
        res.body.title = 'Some title';
        res.body.author = 'Some author';
        res.body.content = 'Some content';
      })
      .expect(200, done);
  });
  it('update', (done) => {
    request(server)
      .patch(`/things/${thingId}`)
      .send({
        title: 'New title',
        author: 'New author',
        content: 'New description',
      })
      .expect((res) => {
        if (!_.isNumber(res.body.id)) throw new Error('Missing ID');
        res.body.title = 'New title';
        res.body.author = 'New author';
        res.body.content = 'New content';
      })
      .expect(200, done);
  });
  it('get all', (done) => {
    request(server)
      .get('/things')
      .expect((res) => {
        if (!_.isArray(res.body)) throw new Error('Missing things');
        res.body.forEach((thing) => {
          if (!_.isString(thing.title)) throw new Error('Missing title');
          if (!_.isString(thing.author)) throw new Error('Missing author');
          if (!_.isString(thing.content)) throw new Error('Missing content');
          if (!_.isNumber(thing.id)) throw new Error('Missing id');
        });
      })
      .expect(200, done);
  });
  it('delete', (done) => {
    request(server).delete('/things/1')
      .expect(204, done);
  });
});
