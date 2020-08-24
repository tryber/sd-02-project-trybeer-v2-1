import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context } from '../../../context';
import Message from '../../../components/Message';
import Header from "../../../components/Header";
import Product from "./Product";
import { getProducts, calculeTotal } from "./service";

import "./style.css";

const buttonRender = ({ total, history }) => {
  return (
    <button className="ver_carrinho" onClick={() => history.push("/checkout")}>
      <span data-testid="checkout-bottom-btn">Ver carrinho</span>
      <span data-testid="checkout-bottom-btn-value">R$ {total}</span>
    </button>
  );
};

const render = ({ history, products, setUpdate, total, update }) => {
  return (
    <React.Fragment>
      <Header title="Trybeer" />
      <div className="products">
        {products.map((product, index) => (
          <Product
            index={index}
            key={product.id}
            product={product}
            setUpdate={setUpdate}
            update={update}
          />
        ))}
      </div>
      {buttonRender({ total, history })}
    </React.Fragment>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(false);
  const { message, setMessage } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    getProducts().then(({ data, error }) => {
      setProducts(data);
      if (error) {
        setMessage({ value: error, type: 'ALERT' });
      }
    });
    setTotal(calculeTotal());
  }, [update]);

  return (
    <div className="products_page">
      {message.value && <Message />}
      {render({ history, products, setUpdate, total, update })}
    </div>
  );
};

export default Products;
