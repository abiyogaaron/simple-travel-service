import { Express } from 'express';
import user from './api/users';
import flight from './api/flights';

const routes = (app: Express) => {
  app.use('/api/users', user);
  app.use('/api/flights', flight);
};

export default routes;
