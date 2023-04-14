import { Sequelize } from 'sequelize';
import environment from '../../config/environment';

const config = require(__dirname + '/../config/database.json')[environment.env];

class Database {
  private static sequelize: Sequelize;

  //eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.sequelize) {
      Database.sequelize = config.url 
        ? new Sequelize(config.url, config)
        : new Sequelize(config.database, config.username, config.password, {
          host: config.host,
          dialect: config.dialect,
        });
    }
    return Database.sequelize;
  }
}

const sequelize = Database.getInstance();
export { Sequelize, sequelize };

