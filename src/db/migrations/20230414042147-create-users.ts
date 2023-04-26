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
          first_name: {
            type: new Sequelize.STRING(128),
            allowNull: false,
          },
          last_name: {
            type: new Sequelize.STRING(128),
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
