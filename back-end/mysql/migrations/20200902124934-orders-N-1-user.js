/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.removeColumn('orders', 'user_id');
  },
};
