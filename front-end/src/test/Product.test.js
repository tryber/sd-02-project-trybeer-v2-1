import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import renderWithRouter from './service/renderWithRouter';
import { fireEvent, wait, cleanup } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom';

import { Provider } from '../context';
import Products from '../pages/Client/Products';
import { productsMock } from './service/mock';


jest.mock('axios');

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Products page', () => {
  test('page render', async () => {
    axios.get.mockResolvedValue({ data: productsMock });

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Products />
      </Provider>
    );

    await wait();

    for (let i = 0; i < productsMock.length; i++) {
      const { name, price, volume, img } = productsMock[0];
      expect(getByTestId(`${i}-product-price`).innerHTML).toBe(`${price.toFixed(2)} R$`);
      expect(getByTestId(`${i}-product-img`).getAttribute('src')).toBe(img);
      expect(getByTestId(`${i}-product-name`).innerHTML).toBe(`${name} ${volume}ml`);
      expect(getByTestId(`${i}-product-qtd`).innerHTML).toBe('0');
    }

    expect(getByTestId("checkout-bottom-btn").innerHTML).toBe('Ver carrinho');
    expect(getByTestId("checkout-bottom-btn-value").innerHTML).toBe('R$ 0.00');
    fireEvent.click(getByTestId('0-product-plus'));
    await wait();
    fireEvent.click(getByTestId('0-product-plus'));
    await wait();
    expect(localStorage.getItem('products')).toBe("{\"1\":{\"id\":\"1\",\"name\":\"cerva1\",\"price\":2.2,\"volume\":500,\"count\":2}}"
    );
    expect(getByTestId('0-product-qtd').innerHTML).toBe('2');
    fireEvent.click(getByTestId('0-product-minus'));
    await wait();
    fireEvent.click(getByTestId('0-product-minus'));
    await wait();
    expect(localStorage.getItem('products')).toBe("{}");
  });

  test('test component Header', async () => {
    axios.get.mockResolvedValue({ data: productsMock });

    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <Products />
      </Provider>,
    );

    await wait();
    expect(getByTestId('top-hamburguer').tagName).toBe('BUTTON');
    expect(getByTestId('top-title').innerHTML).toBe('Trybeer');

    fireEvent.click(getByTestId('top-hamburguer'));
    expect(getByTestId('side-menu-item-products').innerHTML).toBe('Produtos');
    expect(getByTestId('side-menu-item-my-orders').innerHTML).toBe('Meus pedidos');
    expect(getByTestId('side-menu-item-my-profile').innerHTML).toBe('Meus perfil');
    expect(getByTestId('side-menu-item-logout').innerHTML).toBe('Sair');

    fireEvent.click(getByTestId('side-menu-item-my-orders'));
    expect(history.location.pathname).toBe('/orders');
    history.push('/products');

    fireEvent.click(getByTestId('side-menu-item-my-profile'));
    expect(history.location.pathname).toBe('/profile');
    history.push('/products');

    fireEvent.click(getByTestId('side-menu-item-logout'));
    expect(history.location.pathname).toBe('/login');
  });
  test('test empty data', async () => {
    axios.get.mockResolvedValue({});
    renderWithRouter(
      <Provider>
        <Products />
      </Provider>,
    );
    await wait();
  });
  test('test empty data', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error({ error: { message: 'Sem elementos' } })),
    );
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Products />
      </Provider>,
    );
    await wait();
    expect(getByTestId('message')).toBeInTheDocument();
  });
});
