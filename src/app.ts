import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';

import config from './config/environment';
import routes from './routes';
import { sequelize as db } from './db/models';

const app = express();

app.use(cors({ origin: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

const server = http.createServer(app);

async function startServer() {
  try {
    await db.authenticate();
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
