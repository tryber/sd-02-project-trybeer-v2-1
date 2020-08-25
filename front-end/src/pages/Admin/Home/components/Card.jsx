import React from 'react';
const formatBrl = (value) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const Card = ({ address, number, orderId, status, totalPrice, index }) => (
  <div className="card_container">
    <div className="first_box">
      <h3 data-testid={`${index}-order-number`}>Pedido:{orderId}</h3>
    <p data-testid={`${index}-order-address`}>{`${address}, ${number}`}</p>
    </div>
    <div className="last_box">
      <p data-testid={`${index}-order-total-value`}>{formatBrl(totalPrice)}</p>
      <label className={status === 'entregue' ? 'label_success' : 'label_waiting'}>{status}</label>
    </div>
  </div>
);

export default Card;
