import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '.';

import { ETravelClass } from 'src/types';

interface ISeatDetailsAttributes {
  id: number;
  flight_id: number;
  travel_class: ETravelClass;
  price: number;
  capacity: number;
}

export interface ISeatDetailsCreationAttributes extends Optional<ISeatDetailsAttributes, 'id'> {}
export interface ISeatDetailsReturnedAttributes extends Required<ISeatDetailsAttributes> {}

export interface ISeatDetailsInstance extends Model<ISeatDetailsAttributes, ISeatDetailsCreationAttributes>, 
  ISeatDetailsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const SeatDetails = sequelize.define<ISeatDetailsInstance>(
  'seat_details',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    flight_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: {
          tableName: 'seat_details',
        },
        key: 'id',
      },
      allowNull: false,
    },
    travel_class: {
      type: new DataTypes.STRING(32),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    underscored: true,
    indexes: [
      {
        fields: ['flightId'],
      },
    ],
  },
);

export default SeatDetails;
