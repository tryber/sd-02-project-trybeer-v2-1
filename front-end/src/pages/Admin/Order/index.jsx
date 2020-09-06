import React, { useEffect, useState, useContext } from "react";

import { Context } from "../../../context";
import Message from "../../../components/Message";
import Menu from "../Menu";
import { getOrder, updateOrder } from "../../../services/orders";
import OrderProductsRender from "../../../components/OrderProducts";

import "./style.css";

const marcar = (id, setMessage, shipping) => {
  updateOrder(id, { status: shipping }).then(({ data: { message } }) => {
    setMessage({ value: message, type: "SUCCESS" });
  });
};

const ordersRender = (products, order) => {
  return (
    <div className="orders">
      <OrderProductsRender products={products} />
      <div className="total">
        <strong data-testid="order-total-value">
          Total: R$ {order.totalPrice.toFixed(2)}
        </strong>
        <strong>status: {order.status}</strong>
      </div>
    </div>
  );
};

const renderButton = (
  shipping,
  id,
  setMessage,
  shippingStatus,
  setShipping
) => (
  <button
    type="button"
    onClick={() => {
      const newShipping = shippingStatus[shippingStatus.indexOf(shipping) + 1];
      setShipping(newShipping);
      marcar(id, setMessage, newShipping);
    }}
    data-testid="mark-as-delivered-btn"
  >
    Atualizar status
  </button>
);

const Order = (props) => {
  const [order, setOrder] = useState({
    status: "",
    number: 0,
    orderDate: "",
    totalPrice: 1,
  });
  const [products, setProducts] = useState([]);
  const { id } = props.match.params;
  const { setMessage } = useContext(Context);
  const shippingStatus = ["Pendente", "Preparando", "Entregue"];
  const [shipping, setShipping] = useState("");

  useEffect(() => {
    getOrder(id).then(({ data }) => {
      const { products, ...order } = data;
      setOrder(order);
      setProducts(products);
      setShipping(order.status);
    });
  }, [shipping]);

  if (!order.status) return <div />;

  return (
    <div className="order_admin">
      <Menu />
      <Message infinity />
      <div className="container">
        <p>
          Pedido <span data-testid="order-number">{order.orderId} - </span>
          <span data-testid="order-status">{order.status}</span>{" "}
          {order.orderDate}
        </p>
        {ordersRender(products, order)}
        {order.status !== "Entregue" &&
          renderButton(shipping, id, setMessage, shippingStatus, setShipping)}
      </div>
    </div>
  );
};

export default Order;
