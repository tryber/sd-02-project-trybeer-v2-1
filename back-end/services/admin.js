const { orders } = require('../models');
const { getOrdersList } = require('./utils');

const list = async () => {
  const ordersDetails = await orders.list();

  return getOrdersList(ordersDetails);
};

module.exports = {
  list,
};
