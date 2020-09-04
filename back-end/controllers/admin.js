const { admin } = require('../services');

const list = async (_req, res) => {
  const ordersList = await admin.list();

  res.status(200).json({ allOrders: ordersList });
};

module.exports = {
  list,
};
