function Product(sequelize, DataTypes) {
  const Products = sequelize.define(
    "products",
    {
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      volume: DataTypes.INTEGER,
      urlImage: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Products.associate = (models) => {
    Products.belongsToMany(models.orders, {
      through: "orders_products",
      foreignKey: "order_id",
      otherKey: "product_id",
    });
  };

  return Products;
}

module.exports = Product;
