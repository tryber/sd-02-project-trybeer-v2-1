const { orders, products } = require("../models");
const { orderDetails } = require("./utils");

const list = async (id) =>
  orders.list({
    key: "user_id",
    value: id,
  });

const details = async (id) => {
  const ordersDetails = await orders.details(id);

  const {
    dataValues: { products: product, ...order },
  } = ordersDetails;

  const productsDetails = product.map(
    ({ dataValues: { orders_products, ...rest } }) => ({
      ...rest,
      quantity: orders_products.quantity,
    })
  );

  return {
    ...order,
    products: productsDetails,
  };
};

const update = async (id) => orders.update(id);

const insert = async ({
  userId,
  orderDate,
  totalPrice,
  products: productsCC,
  address,
  number,
}) => {
  const insertOrders = await orders.insert({
    userId,
    orderDate,
    totalPrice,
    address,
    number,
  });

  return orders.insertOrdersProducts({
    orderId: insertOrders,
    products: productsCC,
  });
};

module.exports = {
  list,
  insert,
  details,
  update,
};
