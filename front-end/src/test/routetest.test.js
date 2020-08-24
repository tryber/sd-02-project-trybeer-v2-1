// mocks
// 1 - mockar postData (focar para o role de admin)
// 2 - localStorage.setItem
// 3 - mockar parâmetros de handleSubmit { event, body, history, setMessage }

import * as Request from '../services/Request';
import { handleSubmit } from '../pages/Login/service';


describe('user and admin routes', () => {
  test('when user is not admin, go to user page', async () => {
    jest.spyOn(Request, 'postData').mockResolvedValueOnce({ data: { user: { email: 'user@user.com', password: '1234', role: 'client' } } }); //1
    // jest.spyOn(localStorage, 'setItem') //2
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const historyMock = {
      push: jest.fn(),
    };
    const setMessageMock = jest.fn(); //3
    await handleSubmit({ event: eventMock, body: {}, history: historyMock, setMessage: setMessageMock });
    expect(historyMock.push).toBeCalledWith('/products');
  });
  test('when user is an admin, go to admin page', async () => {
    jest.spyOn(Request, 'postData').mockResolvedValueOnce({ data: { user: { email: 'admin@admin.com', password: '1234', role: 'admin' } } }); //1
    // jest.spyOn(localStorage, 'setItem') //2
    const eventMock = {
      preventDefault: jest.fn(),
    };
    const historyMock = {
      push: jest.fn(),
    };
    const setMessageMock = jest.fn(); //3
    await handleSubmit({ event: eventMock, body: {}, history: historyMock, setMessage: setMessageMock });
    expect(historyMock.push).toBeCalledWith('/admin/orders');
  });
});
