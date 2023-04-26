import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'flights',
        {
          id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:  true,
          },
          airport_from: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          airport_destination: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          departure_time: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: '1970-01-01 00:00:01',
          },
          arrival_time: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: '1970-01-01 00:00:01',
          },
          airlines: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          is_refundable: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          is_rescheduleable: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
