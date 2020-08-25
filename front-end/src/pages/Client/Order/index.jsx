import React, { useEffect, useState, useContext } from "react";

import Message from '../../../components/Message';
import Header from '../../../components/Header';
import dateFormat from '../../../services/DateFormat';
import { getOrder } from '../../../services/orders';
import OrderProducts from '../../../components/OrderProducts';
import { Context } from '../../../context';

import "./style.css";


const orderRender = (order, products) => {
  return (
    <div className="margin">
      <div className="header">
        <p>Pedido <span data-testid="order-number">{order.orderId}</span></p>
        <p data-testid="order-date">{dateFormat(order.orderDate)}</p>
      </div>
      <OrderProducts products={products} />
      <div className="total">
        <strong>Total: R$ <span data-testid="order-total-value">{order.totalPrice.toFixed(2)}</span></strong>
      </div>
    </div>
  );
};

const Order = (props) => {
  const { id } = props.match.params;
  const [order, setOrder] = useState({ orderDate: '', totalPrice: 0.0 });
  const [products, setProducts] = useState([]);
  const { message, setMessage } = useContext(Context);

  useEffect(() => {
    getOrder(id)
      .then(({ data, error }) => {
        if (error) {
          return setMessage({ value: error, type: 'ALERT' });
        }
        setOrder(data);
        setProducts(data.products);
      })
  }, []);

  return (
    <div className="order_page">
      <Header title="Detalhes do pedido" />
      {(message.value) && <Message />}
      {(order.orderId) && orderRender(order, products)}
    </div>
  );
};

export default Order;
