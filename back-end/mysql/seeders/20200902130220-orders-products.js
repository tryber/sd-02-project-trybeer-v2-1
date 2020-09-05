const ordersProducts = [
  {
    order_id: 1,
    product_id: 7,
    quantity: 1,
  },
  {
    order_id: 1,
    product_id: 8,
    quantity: 2,
  },
  {
    order_id: 2,
    product_id: 1,
    quantity: 2,
  },
  {
    order_id: 3,
    product_id: 2,
    quantity: 1,
  },
  {
    order_id: 3,
    product_id: 11,
    quantity: 6,
  },
  {
    order_id: 3,
    product_id: 9,
    quantity: 2,
  },
  {
    order_id: 3,
    product_id: 3,
    quantity: 1,
  },
  {
    order_id: 4,
    product_id: 1,
    quantity: 1,
  },
  {
    order_id: 4,
    product_id: 2,
    quantity: 1,
  },
];

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('orders_products', ordersProducts);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('orders_products', null);
  },
};
