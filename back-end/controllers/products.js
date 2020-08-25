const { products } = require('../services');

const list = async (_req, res) => {
  const data = await products.list();

  res.status(200).json({ products: data });
};

module.exports = {
  list,
};
