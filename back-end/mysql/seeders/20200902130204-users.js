module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Taylor Swift",
        email: "taylor@hotmail.com",
        password: "123456",
        role: "admin",
      },
      {
        name: "Lana del Rey",
        email: "lana@hotmail.com",
        password: "123456",
      },
      {
        name: "Rian Soares",
        email: "rian@hotmail.com",
        password: "123456",
      },
      {
        name: "Adele",
        email: "adele@hotmail.com",
        password: "123456",
        role: "admin",
      },
    ]);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete("Users", null);
  },
};
