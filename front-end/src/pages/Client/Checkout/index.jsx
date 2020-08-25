import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";

import { Context } from "../../../context";
import Header from '../../../components/Header';
import { postSale } from '../../../services/Request';
import Message from '../../../components/Message';
import Product from './components/product';

import './style.css';

const URL = 'http://localhost:3001/orders';


const getProducts = () => JSON.parse(localStorage.getItem('products')) || {};

const getLocalStorage = () => Object.values(getProducts());

const formatBrl = (value) => value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

const renderForm = (handleSubmit, street, setStreet, homeNumber, setHomeNumber, booleanButton) => (
  <form className="checkout_form" onSubmit={(e) => handleSubmit(e)}>
    <h3>Endereço</h3>
    <label htmlFor="street">Rua:</label>
    <input
      data-testid="checkout-street-input"
      value={street} onChange={({ target }) => setStreet(target.value)}
      id="street"
      type="text"
      required
    />
    <label htmlFor="homeNumber">Número da casa:</label>
    <input
      data-testid="checkout-house-number-input"
      value={homeNumber}
      onChange={({ target }) => setHomeNumber(target.value)}
      id="homeNumber"
      type="text"
      required
    />
    <button
      className="submit_checkout"
      data-testid="checkout-finish-btn"
      type="submit"
      disabled={booleanButton}
    >
      Finalizar Pedido
    </button>
  </form>
);

const Checkout = () => {
  const [total, setTotal] = useState(0);
  const [street, setStreet] = useState('');
  const [homeNumber, setHomeNumber] = useState('');
  const [products, setProducts] = useState([]);
  const { message, setMessage } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    return postSale(URL, { products, address: street, number: homeNumber, totalPrice: total, })
      .then(({ error }) => {
        if (error) return setMessage({ value: 'Não foi possível cadastrar a venda', type: 'ALERT' });
        setMessage({ value: 'Venda realizada com Sucesso', type: 'SUCCESS' });
      });
  };

  useEffect(() => {
    setMessage({ value: '', type: '' });
    setProducts(getLocalStorage()
      .map((product) => ({ ...product, total: product.count * product.price })));
  }, []);

  useEffect(() => { setTotal(products.reduce((acc, curr) => acc + curr.total, 0));  }, [products]);

  if (message.type === 'SUCCESS') {
    localStorage.removeItem('products');
    return <Redirect to="/products" />;
  }

  return (
    <React.Fragment>
      <Header title="Finalizar Pedido" />
      {message.type && <Message />}
      <div className="checkout_container">
        <div className="checkout_container_products">
          <h3>Produtos</h3>
          {products.map((product, index) => (
            <Product
              key={JSON.stringify(product)}
              {...{ products, product, index, setProducts }}
            />
          ))}
          <div className="contain_total"><p className="total_text" data-testid="order-total-value">Total:{formatBrl(total)}</p></div>
        </div>
        <div className="checkout_container_form">
          {renderForm(handleSubmit, street, setStreet, homeNumber, setHomeNumber, !(street && homeNumber) || (total <= 0))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Checkout;
