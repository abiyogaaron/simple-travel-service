import { Migration } from 'sequelize-cli';

const migration: Migration = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:  true,
          },
          email: {
            type: new Sequelize.STRING(128),
            allowNull: false,
          },
          password: {
            type: new Sequelize.STRING(128),
            allowNull: false,
          },
          salt: {
            type: new Sequelize.STRING(32),
            allowNull: false,
          },
          firstName: {
            type: new Sequelize.STRING(128),
            allowNull: false,
          },
          lastName: {
            type: new Sequelize.STRING(128),
            allowNull: false,
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
        'users',
        ['email'],
        {
          unique: true,
          transaction: transaction,
        },
      );
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
