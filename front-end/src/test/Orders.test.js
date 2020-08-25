import React from 'react';
import renderWithRouter from './service/renderWithRouter';
import { fireEvent, wait, cleanup } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect'

import { Provider } from '../context';
import Orders from '../pages/Client/Orders';
import { ordersMock } from './service/mock';


jest.mock('axios');

beforeEach(() => {
  cleanup();
  localStorage.clear();
});

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Orders page', () => {
  test('page render', async () => {
    axios.get.mockResolvedValue({ data: ordersMock });

    const { getByTestId, container, history } = renderWithRouter(
      <Provider>
        <Orders />
      </Provider>
    );

    await wait();

    expect(getByTestId('0-order-number').innerHTML).toBe('Pedido 1');
    expect(getByTestId('0-order-date').innerHTML).toBe('08/04');
    expect(getByTestId('0-order-total-value').innerHTML).toBe('R$ 120.00');
    const order  = container.querySelector('.order');
    fireEvent.click(order);

    expect(history.location.pathname).toBe('/orders/1');
  });

  test('page render without data', async () => {
    axios.get.mockResolvedValue({});

    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Orders />
      </Provider>
    );

    await wait();

    expect(queryByTestId('0-order-number')).not.toBeInTheDocument();
    expect(queryByTestId('0-order-date')).not.toBeInTheDocument();
    expect(queryByTestId('0-order-total-value')).not.toBeInTheDocument();
  });

  test('page render error', async () => {
    axios.get.mockResolvedValue({ error: { message: 'erro' }, data: [] });

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Orders />
      </Provider>
    );

    await wait();

    expect(getByTestId('message-text').innerHTML).toBe('erro');
  });
});
