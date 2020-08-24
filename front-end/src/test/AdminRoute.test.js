import React from 'react';
import renderWithRouter from './service/renderWithRouter';
import { wait } from '@testing-library/react';
import { Provider } from '../context';
import axios from 'axios';
import '@testing-library/jest-dom';
import AdminRoute from '../AdminRoute';

jest.mock('axios');

describe('AdminRoute test', () => {
  test('page render', async () => {
    axios.get.mockResolvedValue({ data: { email: 'user@user.com', role: 'admin' } });
    const fakeAdminComponent = jest.fn(() => <div data-testid="fakeComp">Fake</div>);

    const { getByTestId } = renderWithRouter(
      <Provider>
        <AdminRoute component={fakeAdminComponent} />
      </Provider>
    );

    await wait();
    expect(fakeAdminComponent).toBeCalledTimes(1);
    expect(getByTestId('fakeComp')).toBeInTheDocument();
  });
  test('page render with error', async () => {
    axios.get.mockImplementationOnce(() =>
    Promise.reject(new Error({ error: { message: 'Internal error' } })),
  );
    const fakeAdminComponent = jest.fn(() => <div data-testid="fakeComp">Fake</div>);

    const { getByTestId } = renderWithRouter(
      <Provider>
        <AdminRoute component={fakeAdminComponent} />
      </Provider>
    );

    await wait();
    expect(fakeAdminComponent).toBeCalledTimes(0);
  });
});
