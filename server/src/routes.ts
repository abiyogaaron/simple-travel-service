import { Express } from 'express';
import user from './api/users';
import flight from './api/flights';
import flightReservation from './api/flightReservations';

const routes = (app: Express) => {
  app.use('/api/users', user);
  app.use('/api/flights', flight);
  app.use('/api/flight-reservations', flightReservation);
};

export default routes;
