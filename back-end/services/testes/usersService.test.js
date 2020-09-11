const usersService = require('../users');

const { users } = require('../../models');

const utils = require('../utils');

const faker = require('faker');

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Service', () => {
  describe('Find User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockName = faker.name.findName();

      const mockUserWithoutPassord = {
        id: faker.random.number(),
        email: mockEmail,
        displayName: mockName,
      };

      const mockDataUserReceived = [
        {
          dataValues: {
            ...mockUserWithoutPassord,
            password: mockPassword,
          },
        },
      ];

      const mockModel = jest
        .spyOn(users, 'find')
        .mockResolvedValue(mockDataUserReceived);

      const mockBody = { email: mockEmail };

      const data = await usersService.find(mockBody);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({
        key: 'email',
        value: mockEmail,
      });

      expect(data).toStrictEqual(mockUserWithoutPassord);
    });
  });

  describe('Login User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockName = faker.name.findName();

      const mockBody = { email: mockEmail, password: mockPassword };

      const mockUserWithoutPassord = {
        id: faker.random.number(),
        email: mockEmail,
        displayName: mockName,
      };

      const mockDataUserReceived = [
        {
          dataValues: {
            ...mockUserWithoutPassord,
            password: mockPassword,
          },
        },
      ];

      const mockModel = jest
        .spyOn(users, 'find')
        .mockResolvedValue(mockDataUserReceived);

      const mockCheckString = jest
        .spyOn(utils.bcrypt, 'checkString')
        .mockResolvedValue(true);

      const mockToken = faker.random.hexaDecimal();

      const mockSignToken = jest
        .spyOn(utils.jsonWebToken, 'signToken')
        .mockReturnValue(mockToken);

      const data = await usersService.login(mockBody);

      expect(mockCheckString).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({
        key: 'email',
        value: mockEmail,
      });

      expect(mockSignToken).toHaveBeenCalledWith(mockUserWithoutPassord);

      expect(data).toStrictEqual({
        token: mockToken,
        user: mockUserWithoutPassord,
        error: null,
      });
    });

    it('on failure - user not found', async () => {
      await usersService.login(mockBody);
    });
    it('on failure - wrongPassword', async () => {
      await usersService.login(mockBody);
    });
  });

  describe('Register User', () => {
    it('on success', async () => {
      await usersService.register(mockBody);
    });
    it('on failure - user exists', async () => {
      await usersService.register(mockBody);
    });
  });

  describe('Update User', () => {
    it('on success', async () => {
      await usersService.update({ email: mockEmail, name: mockName });
    });
    it('on failure - user not found', async () => {
      await usersService.update({ email: mockEmail, name: mockName });
    });
  });
});
