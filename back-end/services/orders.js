const { orders } = require('../models');

const list = async (id) =>
  orders.list({
    key: 'user_id',
    value: id,
  });

const details = async (id) => {
  const ordersDetails = await orders.details(id);

  const {
    dataValues: { products: product, ...order },
  } = ordersDetails;

  const productsDetails = product.map(
    ({ dataValues: { orders_products: ordersProducts, ...rest } }) => ({
      ...rest,
      quantity: ordersProducts.quantity,
    }),
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
