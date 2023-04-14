'use strict';
/** 
 * @type {import('sequelize-cli').Migration}
 * */
module.exports = {
  async up(queryInterface, DataTypes) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey:  true,
          },
          email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
          },
          password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          salt: {
            type: new DataTypes.STRING(32),
            allowNull: false,
          },
          firstName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          lastName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          createdAt: {
            type: new DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.fn('NOW'),
          },
          updatedAt: {
            type: new DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.fn('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
          },
        },
        { transaction: transaction },
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
