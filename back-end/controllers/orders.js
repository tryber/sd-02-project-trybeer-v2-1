const { orders } = require('../services');

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

  res.status(201).json({ message: 'Compra concluída!' });
};

const update = async (req, res) => {
  const { status } = req.body;

  const orderUpdate = await orders.update(req.params.id, status); // armazenar isso em const
  console.log('order update controller:', orderUpdate);
  const { email, id } = orderUpdate;
  console.log('email:', email, 'id:', id)
  // socket.emit (`${email}`, data: id, status )

  res
    .status(201)
    .json({ message: `Status da compra atualizado para ${status}` });
};

module.exports = {
  list,
  insert,
  details,
  update,
};
