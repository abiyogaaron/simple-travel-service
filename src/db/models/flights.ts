import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '.';

import { ISeatDetailsInstance } from './seatDetails';
import { EAirline, EAirport } from '../../types';

interface IFlightAttributes {
  id: number;
  airport_from: EAirport,
  airport_destination: EAirport,
  departure_time: Date,
  arrival_time: Date,
  airlines: EAirline,
  is_refundable: boolean,
  is_rescheduleable: boolean,
}

export interface IFlightCreationAttributes extends Optional<IFlightAttributes, 'id'> {}
export interface IFlightReturnedAttributes extends Required<IFlightAttributes> {}

export interface IFlightInstance extends Model<IFlightAttributes, IFlightCreationAttributes>, 
  IFlightAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  seat_details?: ISeatDetailsInstance[];
}

const Flight = sequelize.define<IFlightInstance>(
  'flights',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    airport_from: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    airport_destination: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    departure_time: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: '1970-01-01 00:00:01',
    },
    arrival_time: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: '1970-01-01 00:00:01',
    },
    airlines: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    is_refundable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_rescheduleable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    underscored: true,
    indexes: [
      {
        fields: ['departure_time'],
      },
      {
        fields: ['airport_from', 'airport_destination'],
      },
    ],
  },
);

export default Flight;
