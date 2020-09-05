/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('orders');
  },
};
