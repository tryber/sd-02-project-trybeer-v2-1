function Order(sequelize, DataTypes) {
  const Orders = sequelize.define(
    "orders",
    {
      address: DataTypes.STRING,
      number: DataTypes.INTEGER,
      total_price: DataTypes.DOUBLE,
      status: DataTypes.STRING,
      order_date: DataTypes.DATEONLY,
    },
    {
      timestamps: false,
    }
  );

  return Orders;
}

module.exports = Order;
