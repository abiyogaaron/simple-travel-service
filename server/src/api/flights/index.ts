import express from 'express';
import * as flight from './controller';
import {
  isAuthenticated,
} from '../../middleware';

let flightRouter = express.Router();

flightRouter.post('/', isAuthenticated, flight.getFlights);

export default flightRouter;
