import { Migration } from 'sequelize-cli';
import FlightReservation from '../models/flightReservations';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const attributes = {
      ...FlightReservation.getAttributes(),
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
        'flight_reservations',
        attributes,
        { transaction: transaction },
      );

      await queryInterface.addIndex(
        'flight_reservations',
        ['user_id', 'flight_id'],
      );

      await transaction.commit();
    } catch (err) {
      console.log('err migration create_user: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('flight_reservations');
  },
};

export default migration;
