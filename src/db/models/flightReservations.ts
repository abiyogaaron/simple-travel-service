import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '.';

interface IFlightReservationAttributes {
  id: number;
  user_id: number;
  flight_id: number;
  num_seats: number;
  total_price: number;
}

export interface IFlightReservationCreationAttributes extends Optional<IFlightReservationAttributes, 'id'> {}
export interface IFlightReservationReturnedAttributes extends Required<IFlightReservationAttributes> {}

export interface IFlightReservationInstance extends Model<
IFlightReservationAttributes, 
IFlightReservationCreationAttributes
>, IFlightReservationAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const FlightReservation = sequelize.define<IFlightReservationInstance>(
  'flight_reservations',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: {
          tableName: 'users',
        },
        key: 'id',
      },
      allowNull: false,
    },
    flight_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: {
          tableName: 'flights',
        },
        key: 'id',
      },
      allowNull: false,
    },
    num_seats: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    underscored: true,
    indexes: [
      {
        fields: ['user_id', 'flight_id'],
      },
    ],
  },
);

export default FlightReservation;
