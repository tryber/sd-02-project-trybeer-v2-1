const { products } = require('../models');

const list = async () => products.list();

module.exports = {
  list,
};
