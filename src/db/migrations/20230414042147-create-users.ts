import { Migration } from 'sequelize-cli';
import User from '../models/users';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const attributes = {
      ...User.getAttributes(),
      created_at: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: 'TIMESTAMP',
        allowNull: true,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
    };

    try {
      await queryInterface.createTable(
        'users',
        attributes,
        { transaction: transaction },
      );

      await queryInterface.addIndex(
        'users',
        ['email'],
        {
          unique: true,
          transaction: transaction,
        },
      );

      await transaction.commit();
    } catch (err) {
      console.log('err migration create_user: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};

export default migration;
