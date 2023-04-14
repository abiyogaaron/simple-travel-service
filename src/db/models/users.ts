import { 
  DataTypes, 
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '.';

interface IUserAttributes {
  id: number;
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
}

export interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}
export interface IUserReturnedAttributes extends Required<IUserAttributes> {}

interface IUserInstance extends Model<IUserAttributes, IUserCreationAttributes>, 
  IUserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<IUserInstance>(
  'users',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey:  true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.STRING(32),
      allowNull: false,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
);

export default User;
