import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

const LinkOut = () => (
  <li>
    <Link onClick={()=> localStorage.clear()} to="/" data-testid="side-menu-item-logout">
      Sair
    </Link>
  </li>
);

const LinkProfile = () => (
  <li>
    <Link to="/admin/profile" data-testid="side-menu-item-profile">
      Perfil
    </Link>
  </li>
);

const LinkOrders = () => (
  <li>
    <Link to="/admin/orders" data-testid="side-menu-item-orders">
      Pedidos
    </Link>
  </li>
);

const Menu = () => {
  return (
    <div className="menu_admin">
      <div className="header">
        <strong>Trybeer</strong>
      </div>
      <nav className="sidebar">
        <ul>
          {LinkOrders()}
          {LinkProfile()}
          {LinkOut()}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
