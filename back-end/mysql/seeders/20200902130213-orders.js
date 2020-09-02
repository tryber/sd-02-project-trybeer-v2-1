"use strict";
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        user_id: "Taylor Swift",
        total_price: 10.00,
          address: "Cornelia Street",
        number: 13,
          status: ,
        
      },
    ]);3
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Orders", null);
  },
};
