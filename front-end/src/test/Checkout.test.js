import React from 'react';
import renderWithRouter from './service/renderWithRouter';
import { fireEvent, wait, cleanup } from '@testing-library/react';
import { Provider } from '../context';
import Checkout from '../pages/Client/Checkout';
import { storageMock } from './service/mock';
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

describe('Checkout page', () => {
  test('page render', async () => {
    localStorage.setItem('products', JSON.stringify(storageMock.products))
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Checkout />
      </Provider>
    );

    for (let i = 0; i < 5; i += 1) {
      expect(getByTestId(`${i}-product-qtd-input`)).toBeInTheDocument();
      expect(getByTestId(`${i}-product-name`)).toBeInTheDocument();
      expect(getByTestId(`${i}-product-total-value`)).toBeInTheDocument();
    }

    expect(getByTestId('0-product-qtd-input')).toHaveTextContent('1');
    expect(getByTestId('0-product-name')).toHaveTextContent('cerva1');
    expect(getByTestId('0-product-total-value')).toHaveTextContent('R$ 2,20');

    expect(getByTestId('1-product-qtd-input')).toHaveTextContent('2');
    expect(getByTestId('1-product-name')).toHaveTextContent('cerva2');
    expect(getByTestId('1-product-total-value')).toHaveTextContent('R$ 4,40');

    expect(getByTestId('2-product-qtd-input')).toHaveTextContent('3');
    expect(getByTestId('2-product-name')).toHaveTextContent('cerva3');
    expect(getByTestId('2-product-total-value')).toHaveTextContent('R$ 6,60');

    expect(getByTestId('3-product-qtd-input')).toHaveTextContent('4');
    expect(getByTestId('3-product-name')).toHaveTextContent('cerva4');
    expect(getByTestId('3-product-total-value')).toHaveTextContent('R$ 8,80');

    expect(getByTestId('4-product-qtd-input')).toHaveTextContent('5');
    expect(getByTestId('4-product-name')).toHaveTextContent('cerva5');
    expect(getByTestId('4-product-total-value')).toHaveTextContent('R$ 11,00');

    expect(getByTestId('order-total-value')).toBeInTheDocument();
    expect(getByTestId('checkout-street-input')).toBeInTheDocument();
    expect(getByTestId('checkout-house-number-input')).toBeInTheDocument();
    expect(getByTestId('checkout-finish-btn')).toBeInTheDocument();

    expect(getByTestId('order-total-value')).toHaveTextContent('Total:R$ 33,00');
    expect(getByTestId('checkout-street-input')).toHaveValue('');
    expect(getByTestId('checkout-house-number-input')).toHaveValue('');
    expect(getByTestId('checkout-finish-btn')).toBeDisabled();
  });

  test('test submit form', async () => {
    axios.post.mockResolvedValue({ data: {} });
    localStorage.setItem('products', JSON.stringify(storageMock.products))
    const { getByTestId, history } = renderWithRouter(
      <Provider>
        <Checkout />
      </Provider>
    );
    fireEvent.change(getByTestId('checkout-street-input'), { target: { value: 'teste' } });
    expect(getByTestId('checkout-street-input')).toHaveValue('teste');
    expect(getByTestId('checkout-finish-btn')).toBeDisabled();
    fireEvent.change(getByTestId('checkout-street-input'), { target: { value: '' } });
    expect(getByTestId('checkout-street-input')).toHaveValue('');
    fireEvent.change(getByTestId('checkout-house-number-input'), { target: { value: '52' } });
    expect(getByTestId('checkout-house-number-input')).toHaveValue('52');
    expect(getByTestId('checkout-finish-btn')).toBeDisabled();
    fireEvent.change(getByTestId('checkout-street-input'), { target: { value: 'teste' } });
    expect(getByTestId('checkout-finish-btn')).not.toBeDisabled();
    fireEvent.submit(getByTestId('checkout-finish-btn'));
    await wait();
    expect(history.location.pathname).toBe('/products');
  });

  test('test submit error', async () => {
    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error({ error: { message: 'Internal error' } })),
    );
    localStorage.setItem('products', JSON.stringify(storageMock.products))
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Checkout />
      </Provider>
    );

    fireEvent.change(getByTestId('checkout-house-number-input'), { target: { value: '52' } });
    fireEvent.change(getByTestId('checkout-street-input'), { target: { value: 'teste' } });
    expect(getByTestId('checkout-finish-btn')).not.toBeDisabled();
    fireEvent.submit(getByTestId('checkout-finish-btn'));
    await wait();
    expect(getByTestId('message')).toBeInTheDocument();
    expect(getByTestId('message')).toHaveTextContent('Não foi possível cadastrar a venda');
  });

  test('product remove', async () => {
    localStorage.setItem('products', JSON.stringify(storageMock.products))
    const { getByTestId } = renderWithRouter(
      <Provider>
        <Checkout />
      </Provider>
    );

    fireEvent.click(getByTestId('0-product-click'));
    fireEvent.click(getByTestId('1-product-click'));
    fireEvent.click(getByTestId('2-product-click'));

    expect(localStorage.getItem('products'))
      .toBe(`{"2":{"id":"2","product":"cerva2","price":2.2,"volume":500,"count":2},"4":{"id":"4","product":"cerva4","price":2.2,"volume":500,"count":4}}`);
  });
});
