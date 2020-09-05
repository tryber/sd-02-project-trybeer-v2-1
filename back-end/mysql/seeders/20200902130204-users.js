const users = [
  {
    name: 'Taylor Swift',
    email: 'taylor@hotmail.com',
    password: '123456',
    role: 'admin',
  },
  {
    name: 'Lana del Rey',
    email: 'lana@hotmail.com',
    password: '123456',
    role: 'client',
  },
  {
    name: 'Rian Soares',
    email: 'rian@hotmail.com',
    password: '123456',
    role: 'client',
  },
  {
    name: 'Adele',
    email: 'adele@hotmail.com',
    password: '123456',
    role: 'admin',
  },
];

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null);
  },
};
