import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from './service/renderWithRouter';
import { fireEvent, wait, cleanup } from '@testing-library/react';
import axios from 'axios';

import { Provider } from '../context';
import Profile from '../pages/Admin/Profile';


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
    axios.get.mockResolvedValue({ data: { name: "teste123456", email: "teste@gmail.com" } });

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>
    );

    await wait();
    expect(getByTestId("profile-name").innerHTML).toBe('Nome:teste123456');
    expect(getByTestId("profile-email").innerHTML).toBe('Email:teste@gmail.com');
    expect(getByTestId("profile-name")).toBeInTheDocument();
    expect(getByTestId("profile-email")).toBeInTheDocument();
  });
  test('test empty data', async () => {
    axios.get.mockResolvedValue({});
    renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    await wait();
  });
  test('test empty data', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error({ message: 'Sem elementos' })),
    );
    const { queryByTestId } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>,
    );
    await wait();
    expect(queryByTestId("profile-name")).toBeNull();
    expect(queryByTestId("profile-email")).toBeNull();
  });
});
