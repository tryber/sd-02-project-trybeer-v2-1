const getOrdersList = (ordersList) => ordersList.map((singleOrder) => {
  const {
    dataValues: {
      products,
      id: orderId,
      total_price: totalPrice,
      order_date: orderDate,
      ...order
    },
  } = singleOrder;
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
});

module.exports = getOrdersList;
