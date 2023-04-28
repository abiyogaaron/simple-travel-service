import * as express from 'express';
import * as flightReservation from './controller';
import {
  isAuthenticated,
} from '../../middleware';

let flightReservationRouter = express.Router();

flightReservationRouter.post('/create', isAuthenticated, flightReservation.createReservation);

export default flightReservationRouter;
