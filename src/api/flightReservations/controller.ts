import {
  // eslint-disable-next-line @typescript-eslint/no-redeclare
  Request, Response,
} from 'express';

import { ETravelClass, IRespBody } from '../../types';
import { sequelize } from '../../db/models';
import redis from '../../redis';
import {
  Flight,
  FlightPassenger,
  FlightReservation,
  SeatDetail,
  User,
} from '../../db/relationships';
import { ISeatDetailsInstance } from '../../db/models/seatDetails';
import { IFlightPassengerCreationAttributes } from '../../db/models/flightPassengers';

import validator from '../../helper/validator';
import { createReservationSchema } from './rule';
import { IFlightReservationInstance } from '../../db/models/flightReservations';

export interface IReqBodyCreateReservation {
  user_id: number;
  flight_id: number;
  passengers: {
    full_name: string;
    email: string;
    age: string;
  }[],
  travel_class: ETravelClass;
}

interface IResBodyCreateReservation extends IFlightReservationInstance {}

export const createReservation = async (
  req: Request<unknown, unknown, IReqBodyCreateReservation>, 
  res: Response<IRespBody<IResBodyCreateReservation>>,
) => {
  const transaction = await sequelize.transaction();
  const {
    user_id,
    flight_id,
    passengers,
    travel_class,
  } = req.body;

  const { isValid, errMsg } = await validator(createReservationSchema, req.body);
  if (!isValid) {
    return res.status(400).json({ message: errMsg });
  }

  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: `user #${user_id} not found!` });
    }

    const flight = await Flight.findByPk(flight_id);
    if (!flight) {
      return res.status(404).json({ message: `flight #${user_id} not found!` });
    }

    /**
     * Get flight seats from redis
     */
    const key = `${flight_id}:${travel_class}`;
    let cacheFlightSeats = await redis.get(key);
    let flightSeats: ISeatDetailsInstance;
    if (!cacheFlightSeats) {
      flightSeats = await SeatDetail.findOne({ where: {
        flight_id: flight.get().id,
        travel_class: travel_class,
      } });

      if (!flightSeats) {
        return res.status(404).json({ message: `flight #${user_id} with ${travel_class} not found!` });
      }
      if (flightSeats.get().capacity === 0) {
        return res.status(404).json({ message: `flight #${user_id} with ${travel_class} not found!` });
      }

      /** Set Redis */
      await redis.set(key, JSON.stringify(flightSeats));
      await redis.expire(key, 300);
    } else {
      flightSeats = JSON.parse(cacheFlightSeats) as ISeatDetailsInstance;
    }

    /** Creating reservation */
    const flightReservation = await FlightReservation.create({
      user_id: user.get().id,
      flight_id: flight.get().id,
      num_seats: passengers.length,
      total_price: flightSeats.get().price * passengers.length,
    }, { transaction: transaction });

    /** Creating passengers flight */
    const remapPassengers: IFlightPassengerCreationAttributes[] = passengers.map((p) => {
      return {
        flight_reservation_id: flightReservation.get().id,
        full_name: p.full_name,
        email: p.email,
        age: p.age,
      };
    });
    await FlightPassenger.bulkCreate(
      remapPassengers,
      { transaction: transaction },
    );

    /** Update seat details */
    await SeatDetail.decrement('capacity', {
      by: passengers.length,
      where: {
        flight_id: flight.get().id,
        travel_class: travel_class,
      },
      transaction: transaction,
    });

    /** Commit transaction */
    await transaction.commit();
    return res.status(201).json({
      data: flightReservation,
      message: 'flight reservation have been created',
    });
  } catch (e) {
    console.error('Create Flight Reservation API Error: ', e);
    await transaction.rollback();
    return res.status(500).json({ message: 'There is a problem, please try again later!' });
  }
};
