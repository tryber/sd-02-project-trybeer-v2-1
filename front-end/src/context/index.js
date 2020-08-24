import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
  const [message, setMessage] = useState({ value: '', type: '' });

  const context = {
    message,
    setMessage,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export { Context, Provider };

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
