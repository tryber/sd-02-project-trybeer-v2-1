const {
  list
} = require('../products');
const {
  products,
} = require('../../mysql/models');

describe('test products Controller', () => {
  describe('success cases', () => {
    it('test correct return in list', async () => {
      const mockData = [{
        products: {
          dataValues: {
            id: 1,
            name: 'Skol Lata',
            price: 2.2,
            volume: 250,
            urlImage: 'http://localhost:3001/images/1.png'
          },
        }
      },
      {
        products: {
          dataValues: {
            id: 4,
            name: 'Brahma',
            price: 7.5,
            volume: 600,
            urlImage: 'http://localhost:3001/images/4.png'
          },
        }
      }
      ];

      const ordersModels = jest
        .spyOn(products, 'findAll')
        .mockReturnValueOnce(mockData);

      const mockJson = jest.fn();
      const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
      const mockReq = {};

      await list(mockReq, mockRes);

      expect(ordersModels).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({ products: mockData});
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.status).toBeCalledTimes(1);

      ordersModels.mockRestore();
    });
  });
});