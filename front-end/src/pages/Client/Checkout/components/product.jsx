import React from 'react';

const getProducts = () => JSON.parse(localStorage.getItem('products')) || {};
const formatBrl = (value) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const removeToLocal = (id) => {
  const products = getProducts();
  delete products[id];
  localStorage.setItem('products', JSON.stringify(products));
};

const Product = ({ product, index, setProducts, products }) => (
  <div className="products_box">
    <div className="product_info"><p data-testid={`${index}-product-qtd-input`} >{product.count}</p></div>
    <div className="product_info"><p data-testid={`${index}-product-name`} >{product.product}</p></div>
    <div className="product_info"><p data-testid={`${index}-product-total-value`}>{formatBrl(product.total)}</p></div>
    <div className="product_info"><button data-testid={`${index}-product-click`} onClick={() => {
      const newProducts = products.filter((produ) => produ.id !== product.id);
      setProducts(newProducts);
      removeToLocal(product.id);
    }}>
      <span className="material-icons">delete</span>
    </button></div>
  </div>
);

export default Product;
