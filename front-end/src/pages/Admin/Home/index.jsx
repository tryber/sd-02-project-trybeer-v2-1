import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { getData } from '../../../services/Request';
import { Context } from '../../../context';
import Card from './components/Card';
import Menu from '../Menu';
import Message from '../../../components/Message';

import './style.css';

const URL = 'http://localhost:3001/admin/orders';

const Home = () => {
  const [orders, setOrders] = useState([]);
  const { message, setMessage } = useContext(Context);

  useEffect(() => {
    getData(URL)
      .then(({ data, error }) => {
        if (error) {
          setMessage({ value: error.status, type: 'ALERT' })
          return;
        }
        setOrders(data.allOrders.sort((a, b) => a.status === 'pendente' ? -1 : 1))
      })
  }, []);

  return (
    <React.Fragment>
      {message.value && <Message />}
      <div className="order_admin">
        <Menu />
        <div className="contain_page">
          <h1>Pedidos</h1>
          <div className="contain_cards">
            {orders.map((order, index) => (
              <Link
                className="card_link"
                style={{ textDecoration: 'none' }}
                to={`/admin/orders/${order.orderId}`} key={JSON.stringify(order)}
              >
                <Card {...{ ...order, index }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Home;
