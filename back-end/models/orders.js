const {
  orders,
  products,
  users,
  orders_products: OrdersProducts,
} = require("../mysql/models");

const list = async ({ key, value }) =>
  orders.findAll({ where: { [key]: value } });

const details = async (id) =>
  orders.findByPk(id, {
    include: [{ model: products }, { model: users }],
    attributes: { exclude: ["user_id"] },
  });

const insert = async ({
  userId,
  totalPrice,
  address,
  number,
  status = "pendente",
}) =>
  orders.create({
    user_id: userId,
    total_price: totalPrice,
    address,
    number,
    status,
  });

const insertOrdersProducts = async (products) =>
  OrdersProducts.bulkCreate(products);

const update = async (id) =>
  orders.update({ status: "Entregue" }, { where: { id } });

module.exports = {
  list,
  details,
  insert,
  insertOrdersProducts,
  update,
};
