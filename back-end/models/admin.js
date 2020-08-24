const { connection } = require('./connection');

const list = async () =>
  connection()
    .then((db) =>
      db
        .getTable('orders')
        .select()
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((arrayOrders) =>
      arrayOrders.map(([orderId, userId, orderDate, totalPrice, address, number, status]) => ({
        orderId,
        userId,
        orderDate,
        totalPrice,
        address,
        number,
        status,
      })),
    );


module.exports = {
  list,
};
