import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { EAirline, EAirport } from '../../types';
import { sequelize } from '.';

interface IFlightAttributes {
  id: number;
  airportFrom: EAirport,
  airportDestination: EAirport,
  departureTime: Date,
  arrivalTime: Date,
  airlines: EAirline,
  price: number,
  isRefundable: boolean,
  isRescheduleable: boolean,
}

export interface IFlightCreationAttributes extends Optional<IFlightAttributes, 'id'> {}
export interface IFlightReturnedAttributes extends Required<IFlightAttributes> {}

interface IFlightInstance extends Model<IFlightAttributes, IFlightCreationAttributes>, 
  IFlightAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Flight = sequelize.define<IFlightInstance>(
  'flights',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    airportFrom: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    airportDestination: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    departureTime: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: '1970-01-01 00:00:01',
    },
    arrivalTime: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: '1970-01-01 00:00:01',
    },
    airlines: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRefundable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isRescheduleable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        fields: ['departureTime'],
      },
      {
        fields: ['airportFrom', 'airportDestination'],
      },
    ],
  },
);

export default Flight;
