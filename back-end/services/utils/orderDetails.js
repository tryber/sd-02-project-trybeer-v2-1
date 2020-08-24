const { orders } = require('../../models');

const orderDetails = async (id) =>
  orders.list({
    key: 'id',
    value: id,
  });

module.exports = orderDetails;
