import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '.';

interface IFlightPassengerAttributes {
  id: number;
  flight_reservation_id: number;
  full_name: string;
  email: string;
  age: string;
}

export interface IFlightPassengerCreationAttributes extends Optional<IFlightPassengerAttributes, 'id'> {}
export interface IFlightPassengerReturnedAttributes extends Required<IFlightPassengerAttributes> {}

export interface IFlightPassengerInstance extends Model<
IFlightPassengerAttributes,
IFlightPassengerCreationAttributes
>, IFlightPassengerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const FlightPassenger = sequelize.define<IFlightPassengerInstance>(
  'flight_passengers',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    flight_reservation_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: {
          tableName: 'flight_reservations',
        },
        key: 'id',
      },
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
  },
  {
    underscored: true,
  },
);

export default FlightPassenger;
