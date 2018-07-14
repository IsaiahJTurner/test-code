import express from 'express';
import massive from 'massive';
import logger from './logger';

let server;

const load = () => {
  const app = express();

  app.get('/things', (req, res) => {
    massive();
    res.status(200).json({
      title: 'Some title',
      id: 1,
      author: 'Some author',
      description: 'Some description',
    });
  });

  app.post('/things', (req, res) => {
    res.status(201).json({
      title: 'Some title',
      id: 1,
      author: 'Some author',
      description: 'Some description',
    });
  });
  app.get('/things/:thingId', (req, res) => {
    res.status(200).json({
      title: 'Some title',
      id: 1,
      author: 'Some author',
      description: 'Some description',
    });
  });
  app.patch('/things/:thingId', (req, res) => {
    res.status(200).json({
      title: 'Some title',
      id: 1,
      author: 'Some author',
      description: 'Some description',
    });
  });
  app.delete('/things/:thingId', (req, res) => {
    res.status(204).send('');
  });
  server = app.listen(process.env.PORT || 3000, function appStarted() {
    logger.info(`Listening on port ${this.address().port}`);
  });
};

load();

module.exports = server;
