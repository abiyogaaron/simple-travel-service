import FlightModel from '../models/flights';
import UserModel from '../models/users';
import SeatDetailsModel from '../models/seatDetails';
import FlightReservationModel from '../models/flightReservations';
import FlightPassengerModel from '../models/flightPassengers';

/**
 * one flight could have many seats
 * one to many relationships
 */
FlightModel.hasMany(SeatDetailsModel);
SeatDetailsModel.belongsTo(FlightModel, { foreignKey: 'flight_id' });

/**
 * one user could have many flight, and one flight can have many user
 * many to many relationships
 */
FlightModel.belongsToMany(UserModel, { through: FlightReservationModel });
UserModel.belongsToMany(FlightModel, { through: FlightReservationModel });
FlightReservationModel.belongsTo(FlightModel);
FlightReservationModel.belongsTo(UserModel);

/**
 * one flight reservation could have many passenger
 * one to many relationships
 */
FlightReservationModel.hasMany(FlightPassengerModel);
FlightPassengerModel.belongsTo(FlightReservationModel, { foreignKey: 'flight_reservation_id' });

export const User = UserModel;
export const Flight = FlightModel;
export const FlightReservation = FlightReservationModel;
export const FlightPassenger = FlightPassengerModel;
export const SeatDetail = SeatDetailsModel;
