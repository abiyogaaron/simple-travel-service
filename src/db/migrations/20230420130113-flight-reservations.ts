import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('flight_reservations', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey:  true,
        },
        user_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: {
              tableName: 'users',
            },
            key: 'id',
          },
          allowNull: false,
        },
        flight_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: {
              tableName: 'flights',
            },
            key: 'id',
          },
          allowNull: false,
        },
        num_seats: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        total_price: {
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
      });

      await queryInterface.addIndex(
        'flight_reservations',
        ['user_id', 'flight_id'],
      );
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
