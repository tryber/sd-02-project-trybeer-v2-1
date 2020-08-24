import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const onclickHandler = (setSideShow) => {
  setSideShow((currentState) => !currentState);
};

const LinkProducts = () => (
  <li>
    <Link to="/products" data-testid="side-menu-item-products">
      Produtos
    </Link>
  </li>
);

const LinkOrders = () => (
  <li>
    <Link to="/orders" data-testid="side-menu-item-my-orders">
      Meus pedidos
    </Link>
  </li>
);

const LinkProfile = () => (
  <li>
    <Link to="/profile" data-testid="side-menu-item-my-profile">
      Meus perfil
    </Link>
  </li>
);

const LinkOut = () => (
  <li>
    <Link onClick={()=> localStorage.clear()} to="/login" data-testid="side-menu-item-logout">
      Sair
    </Link>
  </li>
);

const sidebar = () => {
  return (
    <div className="lateral">
      <nav className="sidebar">
        <ul>
          {LinkProducts()}
          {LinkOrders()}
          {LinkProfile()}
          {LinkOut()}
        </ul>
      </nav>
    </div>
  );
};

const Header = ({ title }) => {
  const [sideShow, setSideShow] = useState(false);

  return (
    <React.Fragment>
      {sideShow && sidebar()}
      <header className="header_comp">
        <button
          data-testid="top-hamburguer"
          className="menu"
          type="button"
          onClick={() => onclickHandler(setSideShow)}
        >
          <span className="material-icons">menu</span>
        </button>
        <div className="title">
          <p data-testid="top-title">{title}</p>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
