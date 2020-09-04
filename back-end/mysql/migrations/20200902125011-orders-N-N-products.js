/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders_products', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'orders',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('orders_products');
  },
};
