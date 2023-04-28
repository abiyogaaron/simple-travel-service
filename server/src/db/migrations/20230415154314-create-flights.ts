import { Migration } from 'sequelize-cli';
import Flight from '../models/flights';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const attributes = {
      ...Flight.getAttributes(),
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
        'flights',
        attributes,
        { transaction: transaction },
      );
      
      await queryInterface.addIndex(
        'flights',
        ['departure_time'],
        { transaction: transaction },
      );

      //Composite Index
      await queryInterface.addIndex(
        'flights',
        ['airport_from', 'airport_destination'],
        { transaction: transaction },
      );

      await transaction.commit();
    } catch (err) {
      console.log('err migration create flights: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('flights');
  },
};

export default migration;
