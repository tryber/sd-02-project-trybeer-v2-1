import React from 'react';
import renderWithRouter from './service/renderWithRouter';
import { wait, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from '../context';
import axios from 'axios';
import '@testing-library/jest-dom';
import Profile from '../pages/Client/Profile';

jest.mock('axios');

afterEach(() => jest.clearAllMocks);

describe('Profile test', () => {
  test('page render', async () => {
    axios.get.mockResolvedValue({ data: { name: "teste123456", email: "teste@gmail.com" } });
    axios.patch.mockResolvedValue({});

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>
    );

    await wait();
    const profileNameInput = getByTestId("profile-name-input");
    const profileEmailInput = getByTestId("profile-email-input");
    expect(profileNameInput).toHaveValue("teste123456");
    expect(profileNameInput).toBeInTheDocument();
    fireEvent.change(profileNameInput, { target: { value: 'testetesteteste' } });
    expect(profileEmailInput).toBeInTheDocument();
    expect(profileEmailInput).toHaveAttribute("readonly");
    fireEvent.click(getByTestId("signin-btn"));
    await wait();
  });
  test('error on Profile and Services', async () => {
    axios.get.mockResolvedValue({ data: { name: "teste123456", email: "teste@gmail.com" } });
    axios.patch.mockImplementationOnce(() =>
      Promise.reject(new Error({ error: { message: 'Internal error' } })),
    );

    const { getByTestId } = renderWithRouter(
      <Provider>
        <Profile />
      </Provider>
    );

    await wait();
    const profileNameInput = getByTestId("profile-name-input");
    fireEvent.change(profileNameInput, { target: { value: 'testetesteteste' } });
    expect(profileNameInput).toHaveValue('testetesteteste');
    const profileEmailInput = getByTestId("profile-email-input");
    expect(profileEmailInput).toBeInTheDocument();
    fireEvent.click(getByTestId("signin-btn"));
    await wait();
  });
});
