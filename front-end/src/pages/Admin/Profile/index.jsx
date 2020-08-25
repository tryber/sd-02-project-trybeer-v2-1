import React, { useEffect, useState, useContext } from 'react';

import { getData } from '../../../services/Request';
import Message from '../../../components/Message';
import { Context } from '../../../context';
import Menu from '../Menu';

import './style.css';

const URL = "http://localhost:3001/users/profile";

const AdminProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const { message, setMessage } = useContext(Context);

  useEffect(() => {
    getData(URL)
      .then(({ data }) => {
        if (!data) {
          setMessage({ value: 'Não foi possível carregar a pagina', type: 'ALERT' });
          return;
        }
        setUser(data);
      })
  }, []);

  return (
    <React.Fragment>
      <div className="order_admin">
        <Menu />
        {message.value
          ? (
            <Message />
          )
          :
          (<div className="admin_profile_info">
            <h2>Perfil</h2>
            <h3 data-testid="profile-name">Nome:{user.name}</h3>
            <h3 data-testid="profile-email">Email:{user.email}</h3>
          </div>)
        }
      </div>
    </React.Fragment>
  );
}

export default AdminProfile;
