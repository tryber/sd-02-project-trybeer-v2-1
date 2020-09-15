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
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockBody = { email: mockEmail, password: mockPassword };

      const mockModel = jest.spyOn(users, 'find').mockResolvedValue([]);

      const data = await usersService.login(mockBody);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({
        key: 'email',
        value: mockEmail,
      });

      expect(data).toStrictEqual({ error: 'userNotFound', token: null });
    });

    it('on failure - wrongPassword', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockName = faker.name.findName();

      const mockBody = { email: mockEmail, password: mockPassword };

      const mockDataUserReceived = [
        {
          dataValues: {
            id: faker.random.number(),
            email: mockEmail,
            displayName: mockName,
            password: faker.internet.password(),
          },
        },
      ];

      const mockModel = jest
        .spyOn(users, 'find')
        .mockResolvedValue(mockDataUserReceived);

      const mockCheckString = jest
        .spyOn(utils.bcrypt, 'checkString')
        .mockResolvedValue(false);

      const data = await usersService.login(mockBody);

      expect(mockCheckString).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({
        key: 'email',
        value: mockEmail,
      });

      expect(data).toStrictEqual({ error: 'wrongPassowrd', token: null });
    });
  });

  describe('Register User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockName = faker.name.findName();

      const mockBody = {
        email: mockEmail,
        displayName: mockName,
        password: mockPassword,
      };

      const mockModel = jest
        .spyOn(users, 'register')
        .mockImplementation(jest.fn());

      const mockFind = jest.spyOn(users, 'find').mockResolvedValue([]);

      const mockHash = faker.random.hexaDecimal();

      const mockCreateHash = jest
        .spyOn(utils.bcrypt, 'createHash')
        .mockResolvedValue(mockHash);

      const data = await usersService.register(mockBody);

      expect(mockCreateHash).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockFind).toHaveBeenCalledTimes(1);

      expect(mockModel).toHaveBeenCalledWith({
        email: mockEmail,
        displayName: mockName,
        password: mockHash,
      });

      expect(data).toStrictEqual({
        error: null,
      });
    });

    it('on failure - user exists', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockName = faker.name.findName();

      const mockBody = {
        email: mockEmail,
        displayName: mockName,
        password: mockPassword,
      };

      const mockModel = jest.spyOn(users, 'find').mockResolvedValue(['user']);

      const data = await usersService.register(mockBody);

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual({
        error: 'existUser',
      });
    });
  });

  describe('Update User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockName = faker.name.findName();

      const mockFind = jest.spyOn(users, 'find').mockResolvedValue(['user']);

      const mockModel = jest
        .spyOn(users, 'update')
        .mockImplementation(jest.fn());

      const data = await usersService.update({
        email: mockEmail,
        name: mockName,
      });

      expect(mockModel).toHaveBeenCalledTimes(1);

      expect(mockFind).toHaveBeenCalledTimes(1);

      expect(mockFind).toHaveBeenCalledWith({
        key: 'email',
        value: mockEmail,
      });

      expect(mockModel).toHaveBeenCalledWith({
        name: mockName,
        email: mockEmail,
      });

      expect(data).toStrictEqual({
        error: null,
      });
    });
    it('on failure - user not found', async () => {
      const mockEmail = faker.internet.email();

      const mockName = faker.name.findName();

      const mockFind = jest.spyOn(users, 'find').mockResolvedValue([]);

      const mockModel = jest
        .spyOn(users, 'update')
        .mockImplementation(jest.fn());

      const data = await usersService.update({
        email: mockEmail,
        name: mockName,
      });

      expect(mockModel).toHaveBeenCalledTimes(0);

      expect(mockFind).toHaveBeenCalledTimes(1);

      expect(data).toStrictEqual({
        error: 'userNotFound',
      });
    });
  });
});
