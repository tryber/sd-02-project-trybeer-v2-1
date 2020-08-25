const { admin } = require('../services');

const list = async (_req, res) => {
  const ordersList = await admin.list();

  res.status(200).json({ allOrders: ordersList });
};

const details = async (req, res) => {
  const order = await admin.details(req.params.id);

  res.status(200).json({ order });
};

module.exports = {
  list,
  details,
};
