const usersModel = require('../users');

const { users } = require('../../mysql/models');

const faker = require('faker');

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Model', () => {
  describe('Find User', () => {
    it('on success - find by id', async () => {
      const mockId = faker.random.number();

      const mockUser = ['some-user'];

      const mockFindAll = jest.spyOn(users, 'findAll');

      const mockFindByPk = jest
        .spyOn(users, 'findByPk')
        .mockResolvedValue(mockUser);

      const data = await usersModel.find({ key: 'id', value: mockId });

      expect(mockFindByPk).toHaveBeenCalledTimes(1);

      expect(mockFindAll).toHaveBeenCalledTimes(0);

      expect(data).toStrictEqual(mockUser);
    });

    it('on success - find by field', async () => {
      const mockField = faker.random.word();

      const mockUser = faker.random.objectElement();

      const mockFindAll = jest
        .spyOn(users, 'findAll')
        .mockResolvedValue(mockUser);

      const mockFindByPk = jest.spyOn(users, 'findByPk');

      const data = await usersModel.find({ key: 'field', value: mockField });

      expect(mockFindByPk).toHaveBeenCalledTimes(0);

      expect(mockFindAll).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual(mockUser);
    });
  });

  describe('Register User', () => {
    it('on success', async () => {
      const mockData = faker.random.objectElement();

      const mockUser = faker.random.objectElement();

      const mockCreate = jest
        .spyOn(users, 'create')
        .mockResolvedValue(mockUser);

      const data = await usersModel.register(mockData);

      expect(mockCreate).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual(mockUser);
    });
  });

  describe('Update User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockName = faker.name.findName();

      const mockUser = faker.random.objectElement();

      const mockUpdate = jest
        .spyOn(users, 'update')
        .mockResolvedValue(mockUser);

      const data = await usersModel.update({
        email: mockEmail,
        name: mockName,
      });

      expect(mockUpdate).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual(mockUser);
    });
  });
});
