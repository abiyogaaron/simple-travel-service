import {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Request, Response,
} from 'express';
import moment from 'moment-timezone';
import { Op } from 'sequelize';

import Flight, {
  IFlightCreationAttributes,
  IFlightReturnedAttributes,
} from '../../db/models/flights';
import redis from '../../redis';

import validator from '../../helper/validator';
import { 
  getFlightsSchema,
} from './rule';
import { IRespBody } from 'src/types';

export type TReqBodyGetFlights = Pick<IFlightCreationAttributes, 'airportFrom' | 'airportDestination' | 'departureTime'>;

export const getFlights = async (
  req: Request<unknown, unknown, TReqBodyGetFlights>, 
  res: Response<IRespBody<IFlightReturnedAttributes[]>>,
) => {
  try {
    const { isValid, errMsg } = await validator(getFlightsSchema, req.body);
    if (!isValid) {
      return res.status(400).json({ message: errMsg });
    }

    const { 
      airportFrom, 
      airportDestination, 
      departureTime,
    } = req.body;
    const departureDate = moment(departureTime).tz('Asia/Jakarta');
    const key = `${airportFrom}:${airportDestination}:${departureDate.format('YYYY-MM-DD')}`;

    const cacheFlights = await redis.get(key);
    if (cacheFlights) {
      const cacheResult: IFlightReturnedAttributes[] = JSON.parse(cacheFlights);

      console.log('Return from redis slave: ', cacheFlights);
      return res.status(200).json({ 
        message: 'flights data have been fetched successfully', 
        data: cacheResult,
      });
    }
    
    const startTime = departureDate.set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }).format('YYYY-MM-DDTHH:mm:ss');
    const endTime = departureDate.set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 0,
    }).format('YYYY-MM-DDTHH:mm:ss');

    console.log('Start date: ', new Date(startTime.valueOf()), 'End time: ', new Date(endTime.valueOf()));
    const flights = await Flight.findAll({
      where: {
        [Op.and]: [
          { airportFrom: airportFrom },
          { airportDestination: airportDestination },
          { departureTime: {
            [Op.gte]: startTime.valueOf(),
          } },
          { departureTime: {
            [Op.lte]: endTime.valueOf(),
          } },
        ],
      },
    });

    /** Set Redis */
    await redis.set(key, JSON.stringify(flights));
    await redis.expire(key, 300);

    return res.status(200).json({ 
      message: 'flights data have been fetched successfully', 
      data: flights,
    });
  } catch (e) {
    console.error('Get Flights API Error: ', e);
    return res.status(500).json({ message: 'There is a problem, please try again later!' });
  }
};
