import { Migration } from 'sequelize-cli';
import SeatDetails from '../models/seatDetails';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const attributes = {
      ...SeatDetails.getAttributes(),
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
      await queryInterface.createTable('seat_details',
        attributes,
        { transaction: transaction },
      );

      await queryInterface.addIndex(
        'seat_details',
        ['flight_id'],
        { transaction: transaction },
      );

      await transaction.commit();
    } catch (err) {
      console.log('err migration seat details: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('seat_details');
  },
};

export default migration;
