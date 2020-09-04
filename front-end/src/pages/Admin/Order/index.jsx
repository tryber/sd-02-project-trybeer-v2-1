import React, { useEffect, useState, useContext } from "react";

import { Context } from '../../../context';
import Message from '../../../components/Message';
import Menu from '../Menu';
import { getOrder, updateOrder } from '../../../services/orders';
import OrderProductsRender from '../../../components/OrderProducts';
import dateFormat from '../../../services/DateFormat';

import "./style.css";

const marcar = (id, setMessage, shipping) => {
  updateOrder(id, { shipping })
    .then(({ data: { message } }) => {
      setMessage({ value: message, type: 'SUCCESS' });
    });
};

const ordersRender = (products, order) => {
  return (
    <div className="orders">
      <OrderProductsRender products={products} />
      <div className="total">
        <strong data-testid="order-total-value">Total: R$ {order.totalPrice.toFixed(2)}</strong>
        <strong>status: {order.status}</strong>
      </div>
    </div>
  );
};

const Order = (props) => {
  const [order, setOrder] = useState({ status: '', number: 0, orderDate: '', totalPrice: 1 });
  const [products, setProducts] = useState([]);
  const { id } = props.match.params;
  const { setMessage } = useContext(Context);
  const [shipping, setShipping] = useState(['pendente', 'preparando', 'entregue']);

  useEffect(() => {
    getOrder(id).then(({ data }) => {
      const { products, ...order } = data;
      setOrder(order);
      setProducts(products);
    });
  }, []);
  if (!order.status) return <div />
  return (
    <div className="order_admin">
      <Menu />
      <Message infinity />
      <div className="container">
        <p>Pedido <span data-testid="order-number">{order.orderId} - </span>
          <span data-testid="order-status">{order.status}</span> {dateFormat(order.orderDate)}</p>
        {ordersRender(products, order)}
        {order.status !== 'entregue'
        && (
          <button
            type="button"
            onClick={() => {
              setShipping(shipping[shipping.indexOf(order) + 1]);
              marcar(id, setMessage, shipping);
            }}
            data-testid="mark-as-delivered-btn"
          >
            Atualizar status
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
