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
          airportFrom: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          airportDestination: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          departureTime: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: '1970-01-01 00:00:01',
          },
          arrivalTime: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: '1970-01-01 00:00:01',
          },
          airlines: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false,
          },
          price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          isRefundable: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          isRescheduleable: {
            type: Sequelize.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
          },
          createdAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Sequelize.fn('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            type: 'TIMESTAMP',
            allowNull: true,
            defaultValue: Sequelize.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          },
        },
        { transaction: transaction },
      );
      
      await queryInterface.addIndex(
        'flights',
        ['departureTime'],
        { transaction: transaction },
      );

      //Composite Index
      await queryInterface.addIndex(
        'flights',
        ['airportFrom', 'airportDestination'],
        { transaction: transaction },
      );
    } catch (err) {
      console.log('err migration create_user: ', err);
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('flights');
  },
};

export default migration;
