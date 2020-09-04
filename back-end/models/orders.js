const { orders, products, users } = require("../mysql/models");

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
  connection()
    .then((db) =>
      db
        .getTable("orders")
        .insert([
          "user_id",
          "order_date",
          "total_price",
          "address",
          "number",
          "status",
        ])
        .values(
          userId,
          moment().format("L"),
          totalPrice,
          address,
          number,
          status
        )
        .execute()
    )
    .then((query) => query.getAutoIncrementValue());

const insertOrdersProducts = async ({ orderId, products }) =>
  connection()
    .then((db) =>
      db
        .getTable("orders_products")
        .insert(["order_id", "product_id", "quantity"])
    )
    .then((query) => {
      products.forEach(({ id, count }) => query.values(orderId, id, count));
      return query.execute();
    });

const update = async (id) =>
  connection().then((db) =>
    db
      .getTable("orders")
      .update()
      .set("status", "entregue")
      .where("id = :id")
      .bind("id", id)
      .execute()
  );

module.exports = {
  list,
  details,
  insert,
  insertOrdersProducts,
  update,
};
