import React from "react";
import './style.css';

const OrderProducts = (props) => {
  const { products = [] } = props;

  return (
    <div className="order_product_comp">
      {products.map(({ id, name, price, volume, quantity }, index) => (
        <div className="order" key={id}>
          <p>
            <span data-testid={`${index}-product-qtd`}>{quantity}</span> -
           <span data-testid={`${index}-product-name`}> {name}</span> {volume}ml
         </p>
          <p>R$ <span data-testid={`${index}-product-total-value`}>{(price * quantity).toFixed(2)}</span></p>
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
