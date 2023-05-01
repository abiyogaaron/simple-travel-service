import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

import config from './config/environment';
import routes from './routes';
import { sequelize as db } from './db/models';
import redis from './redis';

const app = express();

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

const server = http.createServer(app);

function startRedisListener() {
  redis.on('connect', () => {
    console.log('Connected to Redis ' + process.pid + ' REDIS ' + JSON.stringify(redis.options) );
  });
  redis.on('error', (err) => {
    console.log('error to Redis ' + err);
  });
}

async function startServer() {
  console.log('(SERVER) run with config: ', config);
  try {
    await db.authenticate();
    await startRedisListener();
    server.listen(config.port, parseInt(config.host), () => {
      console.log('Express server listening on %d, in %s mode %s', config.port, config.host, config.env);
    });
  } catch (err) {
    console.error('error: ', err);
    db.close();
    process.exit(1);
  }
}

setImmediate(startServer);

export default app;
