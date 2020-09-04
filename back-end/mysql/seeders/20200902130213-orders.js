const orders = [
  {
    user_id: 1,
    total_price: 10.57,
    address: 'Cornelia Street',
    number: 13,
    status: 'Pendente',
  },
  {
    user_id: 2,
    total_price: 4.4,
    address: 'Venice Bitch',
    number: 10,
    status: 'Entregue',
  },
  {
    user_id: 2,
    total_price: 48.71,
    address: 'Wonderland',
    number: 10,
    status: 'Pendente',
  },
  {
    user_id: 3,
    total_price: 9.7,
    address: 'Anapurus',
    number: 2,
    status: 'Preparando',
  },
];

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('orders', orders);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('orders', null);
  },
};
