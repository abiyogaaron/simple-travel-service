import {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Request, Response,
} from 'express';
import moment from 'moment-timezone';
import { Op } from 'sequelize';

import {
  IFlightCreationAttributes,
  IFlightInstance,
} from '../../db/models/flights';
import { 
  Flight, 
  SeatDetail,
} from '../../db/relationships';
import redis from '../../redis';

import validator from '../../helper/validator';
import { 
  getFlightsSchema,
} from './rule';
import { IRespBody } from '../../types';

export type TReqBodyGetFlights = Pick<IFlightCreationAttributes, 'airport_from' | 'airport_destination' | 'departure_time'>;
interface TRespBodyGetFlights extends IFlightInstance {}

export const getFlights = async (
  req: Request<unknown, unknown, TReqBodyGetFlights>, 
  res: Response<IRespBody<TRespBodyGetFlights[]>>,
) => {
  try {
    const { isValid, errMsg } = await validator(getFlightsSchema, req.body);
    if (!isValid) {
      return res.status(400).json({ message: errMsg });
    }

    const { 
      airport_from, 
      airport_destination, 
      departure_time,
    } = req.body;
    const departureDate = moment(departure_time).tz('Asia/Jakarta');
    const key = `${airport_from}:${airport_destination}:${departureDate.format('YYYY-MM-DD')}`;

    const cacheFlights = await redis.get(key);
    if (cacheFlights) {
      const cacheResult: TRespBodyGetFlights[] = JSON.parse(cacheFlights);

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
          { airport_from: airport_from },
          { airport_destination: airport_destination },
          { departure_time: {
            [Op.gte]: startTime.valueOf(),
          } },
          { departure_time: {
            [Op.lte]: endTime.valueOf(),
          } },
        ],
      },
      include: {
        model: SeatDetail,
        required: true,
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
