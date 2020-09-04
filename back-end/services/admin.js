const { orders } = require("../models");

const list = async () => orders.list();

module.exports = {
  list,
};
