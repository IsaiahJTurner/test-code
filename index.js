import express from 'express';
import massive from 'massive';
import _ from 'lodash';
import bodyParser from 'body-parser';
import logger from './logger';

const server = new Promise(async (resolve) => {
  const app = express();
  const db = await massive(process.env.DATABASE_URL);
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.sendError = (responseStatus, errorMessage, errorObject) => {
      if (errorObject) {
        logger.error(errorMessage, errorObject);
      }
      res.status(responseStatus).json({
        error: errorMessage,
      });
    };
    next();
  });
  app.get('/things', async (req, res) => {
    try {
      const things = await db.thing.find();
      res.status(200).json(things);
    } catch (error) {
      res.sendError(500, 'Unable to retrieve things', error);
    }
  });

  app.post('/things', async (req, res) => {
    if (!_.isString(req.body.title)) res.sendError(400, 'Missing or invalid title');
    if (!_.isString(req.body.author)) res.sendError(400, 'Missing or invalid author');
    if (!_.isString(req.body.content)) res.sendError(400, 'Missing or invalid content');

    try {
      const thing = await db.thing.insert({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
      });
      res.status(201).json(thing);
    } catch (error) {
      res.sendError(500, 'Unable to create thing', error);
    }
  });
  app.get('/things/:thingId', async (req, res) => {
    try {
      const thing = await db.thing.findOne();
      res.status(200).json(thing);
    } catch (error) {
      res.sendError(500, 'Unable to retrieve thing', error);
    }
  });
  app.patch('/things/:thingId', async (req, res) => {
    if (!_.isString(req.body.title)) res.sendError(400, 'Missing or invalid title');
    if (!_.isString(req.body.author)) res.sendError(400, 'Missing or invalid author');
    if (!_.isString(req.body.content)) res.sendError(400, 'Missing or invalid content');

    try {
      const thing = await db.thing.save({
        id: req.params.thingId,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
      });
      res.status(200).json(thing);
    } catch (error) {
      res.sendError(500, 'Unable to update thing', error);
    }
  });
  app.delete('/things/:thingId', async (req, res) => {
    res.status(204).send('');
  });
  resolve(app.listen(process.env.PORT || 3000, function appStarted() {
    logger.info(`Listening on port ${this.address().port}`);
  }));
});

server.catch(err => logger.error('Unhandled server error', err));

module.exports = server;
