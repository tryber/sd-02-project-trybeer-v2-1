const { orders, products } = require('../models');
const { orderDetails } = require('./utils');

const list = async (id) =>
  orders.list({
    key: 'user_id',
    value: id,
  });

const details = async (id) => {
  const allProducts = await orders.details(id);
  const productsId = allProducts.map(({ productId }) => productId);
  const findOrder = await orderDetails(id);

  const productsDetails = await products.find(productsId);

  const productsWithQuantity = productsDetails
    .map((product) => ({
      ...product,
      quantity: allProducts
        .find(({ productId }) => productId === product.id).quantity,
    }));

  return {
    ...findOrder[0],
    products: productsWithQuantity,
  };
};

const update = async (id) =>
  orders.update(id);

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

  return orders.insertOrdersProducts({ orderId: insertOrders, products: productsCC });
};

module.exports = {
  list,
  insert,
  details,
  update,
};
