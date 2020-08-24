const { admin, orders, products } = require('../models');
const { orderDetails } = require('./utils');


const list = async () =>
  admin.list();

const details = async (id) => {
  const findOrder = await orderDetails(id);

  const allProducts = await orders.details(id);
  const productsId = allProducts.map(({ productId }) => productId);

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

module.exports = {
  list,
  details,
};
