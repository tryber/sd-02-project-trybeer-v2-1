function OrderProduct(sequelize, DataTypes) {
  const OrdersProducts = sequelize.define(
    "orders_products",
    {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );

  return OrdersProducts;
}

module.exports = OrderProduct;
