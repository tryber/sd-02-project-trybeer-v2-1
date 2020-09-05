const { products } = require('../mysql/models');

const list = async () => products.findAll();

const find = async (id) => products.findByPk(id);

module.exports = {
  list,
  find,
};
