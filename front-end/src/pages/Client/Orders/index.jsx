import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import Message from '../../../components/Message';
import Header from '../../../components/Header';
import dateFormat from '../../../services/DateFormat';
import { getOrders } from '../../../services/orders';
import { Context } from '../../../context';

import "./style.css";


const details = (history, orderId) => {
  history.push(`orders/${orderId}`);
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const { message, setMessage } = useContext(Context);

  useEffect(() => {
    getOrders()
    .then(({ data, error }) => {
      if (error) {
        return setMessage({ value: error, type: 'ALERT' });
      }
      setOrders(data);
      setMessage({ value: error, type: 'ALERT' });
      });
  }, []);

  return (
    <div className="orders_page">
      <Header title="Meus Pedidos" />
      {(message.value) && <Message />}
      <div className="orders">
        {orders.map((order, index) => {
          const { orderId, orderDate, totalPrice } = order;
          return (
            <div className="order" key={orderId} onClick={() => details(history, orderId)}>
              <div className="header">
                <strong className="pedido" data-testid={`${index}-order-number`}>Pedido {orderId}</strong>
                <p className="date" data-testid={`${index}-order-date`}>{dateFormat(orderDate)}</p>
              </div>
              <strong data-testid={`${index}-order-total-value`}>R$ {totalPrice.toFixed(2)}</strong>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Orders;
