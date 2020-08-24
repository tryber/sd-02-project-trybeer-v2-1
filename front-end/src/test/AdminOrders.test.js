import React from 'react';
import renderWithRouter from './service/renderWithRouter';
import { wait, cleanup } from '@testing-library/react';
import { Provider } from '../context';
import Home from '../pages/Admin/Home';
import { ordersMock } from './service/mock';
import axios from 'axios';
import '@testing-library/jest-dom';


jest.mock('axios');

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Products page Admin', () => {
  test('page render', async () => {
    axios.get.mockResolvedValue({ data: { allOrders: ordersMock.orders } } );

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Home />
      </Provider>
    );

    await wait();
    ordersMock.orders.forEach((ele, index)=> {
      expect(getByTestId(`${index}-order-number`)).toBeInTheDocument();
      expect(getByTestId(`${index}-order-address`)).toBeInTheDocument();
      expect(getByTestId(`${index}-order-total-value`)).toBeInTheDocument();
    });
    expect(getByTestId('0-order-number')).toHaveTextContent('Pedido:1');
      expect(getByTestId('0-order-address')).toHaveTextContent('Rua, 10');
      expect(getByTestId('0-order-total-value')).toHaveTextContent('R$ 120,00');
  });
  test('error axios', async () => {
    axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error({ error: { message: 'Error' } })),
  );
  const { getByTestId } = renderWithRouter(
    <Provider>
        <Home />
      </Provider>
    );
    
    await wait();
    expect(getByTestId('message')).toBeInTheDocument()
  });
})
