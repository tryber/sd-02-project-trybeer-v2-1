const { connection } = require('./connection');

const list = async () => {
  const products = await connection()
    .then((db) =>
      db
        .getTable('products')
        .select(['id', 'name', 'price', 'volume', 'urlImage'])
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((arrayProducts) =>
      arrayProducts.map(([id, name, price, volume, urlImage]) => ({
        id,
        name,
        price,
        volume,
        urlImage,
      })),
    );

  if (!products) return null;

  return products;
};

const find = async (id) =>
  connection()
    .then((db) =>
      db
        .getTable('products')
        .select(['id', 'name', 'price', 'volume', 'urlImage']),
    )
    .then((query) => {
      const string = id.reduce(
        (acc, curr, index) => {
          if (index !== 0) return `${acc} OR id = :id_${curr}`;
          return `id = :id_${curr}`;
        },
        '',
      );
      query.where(string);
      id.forEach((curr) => query.bind(`id_${curr}`, curr));
      return query.execute();
    })
    .then((results) => results.fetchAll())
    .then((arrayProducts) =>
      arrayProducts.map(([productId, name, price, volume, urlImage]) => ({
        id: productId,
        name,
        price,
        volume,
        urlImage,
      })),
    );

module.exports = {
  list,
  find,
};
