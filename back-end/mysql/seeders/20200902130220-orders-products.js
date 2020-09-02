module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert("order_products", [
      {
        name: "Taylor Swift",
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("order_products", null);
  },
};
