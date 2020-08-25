import React, { useState, useEffect } from "react";

import "./style.css";

const updateCarShop = ({ count, product }) => {
  const products = JSON.parse(localStorage.getItem("products")) || {};

  const currentProduct = products.id || product;

  const updateProducts = {
    ...products,
    [product.id]: { ...currentProduct, count },
  };

  localStorage.setItem("products", JSON.stringify(updateProducts));
};

const deleteProductFromCarShop = (productId) => {
  const products = JSON.parse(localStorage.getItem("products")) || {};

  const { [productId]: _deletedProduct, ...othersProducts } = products;

  localStorage.setItem("products", JSON.stringify(othersProducts));
};

const add = ({ count, setCount, product, setUpdate }) => {
  const updateCount = count + 1;

  setCount(updateCount);

  updateCarShop({ product, count: updateCount });

  setUpdate((update) => !update);
};

const remove = ({ count, setCount, product, setUpdate }) => {
  if (count === 0) return;

  const updateCount = count - 1;

  setCount(updateCount);

  setUpdate((update) => !update);

  if (updateCount === 0) {
    return deleteProductFromCarShop(product.id);
  }

  if (updateCount > 0) {
    updateCarShop({ product, count: updateCount });
  }
};

const counter = ({ count, index, product, setCount, setUpdate }) => {
  return (
    <div className="counter">
      <button
        data-testid={`${index}-product-plus`}
        onClick={() => add({ count, setCount, product, setUpdate })}
        type="button"
      >
        <span className="material-icons">add</span>
      </button>
      <p data-testid={`${index}-product-qtd`}>{count}</p>
      <button
        data-testid={`${index}-product-minus`}
        onClick={() => remove({ count, setCount, product, setUpdate })}
        type="button"
      >
        <span className="material-icons">remove</span>
      </button>
    </div>
  );
};

const Product = ({ index, product, setUpdate, update }) => {
  const [count, setCount] = useState(0);
  const { id, name, price, volume, urlImage } = product;

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "{}");
    if (products[id]) {
      setCount(products[id].count);
    }
  }, []);

  return (
    <div className="product_comp">
      <p className="price" data-testid={`${index}-product-price`}>
        R$ {price.toFixed(2)}
      </p>
      <div className="img">
        <img src={urlImage} alt="product" data-testid={`${index}-product-img`} />
      </div>
      <p className="name" data-testid={`${index}-product-name`}>
        {name} {volume}ml
      </p>
      {counter({ count, index, product, setCount, setUpdate, update })}
    </div>
  );
};

export default Product;
