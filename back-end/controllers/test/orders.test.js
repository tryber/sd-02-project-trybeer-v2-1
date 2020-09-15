const {
  list,
  insert,
  details,
  update,
} = require('../orders');
const {
  orders,
  orders_products: OrdersProducts,
} = require('../../mysql/models');

describe('test orders Controller', () => {
  describe('success cases', () => {
    it('test correct return in list', async () => {
      const mockData = [{
        dataValues: {
          products: [
            { dataValues: { orders_products: { quantity: 1 } } }
          ],
          id: 1,
          total_price: 2,
          order_date: new Date('2020-09-07T20:34:50.558Z'),
        },
      }];

      const ordersModels = jest
        .spyOn(orders, 'findAll')
        .mockReturnValueOnce(mockData);

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = { user: { id: 1 } };

      await list(mockReq, mockRes);

      expect(ordersModels).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        orders: [{
          orderDate: new Date('2020-09-07T20:34:50.558Z'),
          orderId: 1,
          products: [{
            quantity: 1,
          }],
          totalPrice: 2,
        }],
      });
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModels.mockRestore();
    });
    it('test correct return in list', async () => {
      const mockData = [{
        dataValues: {
          products: [
            { dataValues: { orders_products: { quantity: 1 } } }
          ],
          id: 1,
          total_price: 2,
          order_date: new Date('2020-09-07T20:34:50.558Z'),
        },
      }];

      const ordersModels = jest
        .spyOn(orders, 'findAll')
        .mockReturnValueOnce(mockData);

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = { user: { id: false } };

      await list(mockReq, mockRes);

      expect(ordersModels).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        orders: [{
          orderDate: new Date('2020-09-07T20:34:50.558Z'),
          orderId: 1,
          products: [{
            quantity: 1,
          }],
          totalPrice: 2,
        }],
      });
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModels.mockRestore();
    });
    it('test correct return in details', async () => {
      const mockData = {
        dataValues: {
          products: [
            { dataValues: { orders_products: { quantity: 1 } } }
          ],
          id: 1,
          total_price: 2,
          order_date: new Date('2020-09-07T20:34:50.558Z'),
        },
      };

      const ordersModels = jest
        .spyOn(orders, 'findByPk')
        .mockReturnValueOnce(mockData);

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = { params: { id: 1 } };

      await details(mockReq, mockRes);

      expect(ordersModels).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        order: {
          orderDate: new Date('2020-09-07T20:34:50.558Z'),
          orderId: 1,
          products: [{
            quantity: 1,
          }],
          totalPrice: 2,
        },
      });
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModels.mockRestore();
    });
    it('test correct return in insert', async () => {
      const ordersModelsCreate = jest
        .spyOn(orders, 'create')
        .mockReturnValueOnce({ dataValues: { id: 1 }, });
      const ordersModelbulkCreate = jest
        .spyOn(OrdersProducts, 'bulkCreate')
        .mockReturnValueOnce();

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = {
        body: {
          orderDate: new Date('2020-09-07T20:34:50.558Z'),
          totalPrice: 10,
          products: [{
            quantity: 1,
          }],
          address: 'Rua',
          number: 12,
        },
        user: { id: 1 }
      };

      await insert(mockReq, mockRes);

      expect(ordersModelsCreate).toBeCalledTimes(1);
      expect(ordersModelbulkCreate).toBeCalledTimes(1);

      expect(mockJson).toBeCalledWith({ message: 'Compra concluída!' });
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModelsCreate.mockRestore();
      ordersModelbulkCreate.mockRestore();
    });
    it('test correct return in update', async () => {
      const ordersModels = jest
        .spyOn(orders, 'update')
        .mockReturnValueOnce({ dataValues: { id: 1 }, });

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = {
        body: { status: 'entregue' },
        params: { id: 1 }
      };

      await update(mockReq, mockRes);

      expect(ordersModels).toBeCalledTimes(1);

      expect(mockJson).toBeCalledWith({ message: 'Status da compra atualizado para entregue' });
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModels.mockRestore();
    });
  });
});