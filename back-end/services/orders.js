const { orders } = require('../models');
const { getOrdersList } = require('./utils');

const list = async (id) => {
  const ordersList = await orders.list({ key: 'user_id', value: id });

  return getOrdersList(ordersList);
};

const details = async (id) => {
  const ordersDetails = await orders.details(id);

  const {
    dataValues: {
      products,
      id: orderId,
      total_price: totalPrice,
      order_date: orderDate,
      ...order
    },
  } = ordersDetails;

  const productsDetails = products.map(
    ({ dataValues: { orders_products: ordersProducts, ...rest } }) => ({
      ...rest,
      quantity: ordersProducts.quantity,
    }),
  );

  return {
    ...order,
    orderId,
    totalPrice,
    orderDate,
    products: productsDetails,
  };
};

const update = async (id, status) => orders.update(id, status);

const insert = async ({
  userId,
  orderDate,
  totalPrice,
  products: productsCC,
  address,
  number,
}) => {
  const order = await orders.insert({
    userId,
    orderDate,
    totalPrice,
    address,
    number,
  });

  const {
    dataValues: { id: orderId },
  } = order;

  return orders.insertOrdersProducts(
    productsCC.map(({ id, quantity }) => ({
      product_id: id,
      quantity,
      order_id: orderId,
    })),
  );
};

module.exports = {
  list,
  insert,
  details,
  update,
};
