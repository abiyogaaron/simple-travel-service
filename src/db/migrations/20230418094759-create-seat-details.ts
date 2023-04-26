import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('seat_details',
        {
          id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:  true,
          },
          flight_id: {
            type: Sequelize.INTEGER.UNSIGNED,
            references: {
              model: {
                tableName: 'seat_details',
              },
              key: 'id',
            },
            allowNull: false,
          },
          travel_class: {
            type: new Sequelize.STRING(32),
            allowNull: false,
          },
          price: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          capacity: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
          },
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
        },
      );

      await queryInterface.addIndex(
        'seat_details',
        ['flight_id'],
        { transaction: transaction },
      );
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
