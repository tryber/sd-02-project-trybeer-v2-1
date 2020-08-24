import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from "./services/Request";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useState(false);
  const [isTokenValidated, setIsTokenValidated] = useState(false);

  useEffect(() => {
    isAdmin('http://localhost:3001/users/admin')
      .then(({ data }) => {
        if (data.role === 'admin') setAuth(true);
        setIsTokenValidated(true);
      })
      .catch(()=> setIsTokenValidated(true));
  }, []);
  
  if (!isTokenValidated) return <div />;

  return (
    <Route
      {...rest}
      render={(props) => {
        return auth ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default AdminRoute;
