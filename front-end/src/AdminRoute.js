import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './services/Request';

const AdminRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    getUser('http://localhost:3001/users/getUser')
      .then(({ data }) => {
        if (data.role === 'admin') setAuth(true);
        setIsTokenValidated(true);
      })
      .catch(() => setIsTokenValidated(true));
  }, []);

  if (!isTokenValidated) return <div />;

  return (
    <Route
      {...rest}
      render={(props) => (auth ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default AdminRoute;

AdminRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
