import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('flight_passengers', {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey:  true,
        },
        flight_reservation_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: {
              tableName: 'flight_reservations',
            },
            key: 'id',
          },
          allowNull: false,
        },
        full_name: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
        },
        age: {
          type: Sequelize.STRING(16),
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

    } catch (err) {
      console.log('err migration create_user: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('flight_passengers');
  },
};

export default migration;
