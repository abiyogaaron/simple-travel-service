import { Express } from 'express';
import user from './api/users';

const routes = (app: Express) => {
  app.use('/api/users', user);
};

export default routes;
