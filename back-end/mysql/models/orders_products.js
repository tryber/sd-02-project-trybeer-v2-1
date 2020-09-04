function OrderProduct(sequelize, DataTypes) {
  const OrdersProducts = sequelize.define(
    'orders_products',
    {
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    },
  );

  OrdersProducts.associate = (models) => {
    models.orders.belongsToMany(models.products, {
      through: OrdersProducts,
      foreignKey: 'order_id',
      otherKey: 'product_id',
    });

    models.products.belongsToMany(models.orders, {
      through: OrdersProducts,
      foreignKey: 'product_id',
      otherKey: 'order_id',
    });
  };

  return OrdersProducts;
}

module.exports = OrderProduct;
