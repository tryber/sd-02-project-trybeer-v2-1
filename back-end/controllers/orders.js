const { orders } = require("../services");

const list = async (req, res) => {
  const ordersList = await orders.list(req.user.id);

  res.status(200).json({ orders: ordersList });
};

const details = async (req, res) => {
  const order = await orders.details(req.params.id);

  res.status(200).json({ order });
};

const insert = async (req, res) => {
  await orders.insert({ ...req.body, userId: req.user.id });

  res.status(201).json({ message: "Compra concluída!" });
};

const update = async (req, res) => {
  await orders.update(req.params.id);

  res.status(201).json({ message: "Produto Entregue!" });
};

module.exports = {
  list,
  insert,
  details,
  update,
};
