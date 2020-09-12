const usersController = require('../users');
const { users } = require('../../services');

const faker = require('faker');

afterEach(() => {
  jest.clearAllMocks();
});

describe('User Controller', () => {
  describe('Find User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockReq = { user: { email: mockEmail } };

      const mockDataUserReceived = {
        id: faker.random.number(),
        email: mockEmail,
        displayName: faker.name.findName(),
      };

      const mockMOdel = jest
        .spyOn(users, 'find')
        .mockResolvedValue(mockDataUserReceived);

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.find(mockReq, mockRes);

      expect(mockMOdel).toHaveBeenCalledTimes(1);

      expect(mockMOdel).toHaveBeenCalledWith({ email: mockEmail });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith(mockDataUserReceived);
    });
  });

  describe('Login User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockToken = faker.random.hexaDecimal();

      const mockId = faker.random.number();

      const mockName = faker.name.findName();

      const mockReq = { body: { email: mockEmail, password: mockPassword } };

      const mockDataUserReceived = {
        error: null,
        token: mockToken,
        user: {
          id: mockId,
          email: mockEmail,
          displayName: mockName,
        },
      };

      const mockMOdel = jest
        .spyOn(users, 'login')
        .mockResolvedValue(mockDataUserReceived);

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.login(mockReq, mockRes);

      expect(mockMOdel).toHaveBeenCalledTimes(1);

      expect(mockMOdel).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        token: mockToken,
        user: {
          id: mockId,
          email: mockEmail,
          displayName: mockName,
        },
      });
    });

    it('on failure - user not found', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockReq = { body: { email: mockEmail, password: mockPassword } };

      const mockDataUserReceived = {
        error: 'userNotFound',
        token: null,
        user: null,
      };

      const mockMOdel = jest
        .spyOn(users, 'login')
        .mockResolvedValue(mockDataUserReceived);

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      try {
        await usersController.login(mockReq, mockRes);
      } catch (err) {
        const {
          output: {
            payload: { statusCode, message },
          },
        } = err;

        expect(statusCode).toBe(400);

        expect(message).toBe('User not exists');
      } finally {
        expect(mockMOdel).toHaveBeenCalledTimes(1);

        expect(mockMOdel).toHaveBeenCalledWith({
          email: mockEmail,
          password: mockPassword,
        });

        expect(mockRes.status).toHaveBeenCalledTimes(0);
      }
    });

    it('on failure - wrongPassword', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockReq = { body: { email: mockEmail, password: mockPassword } };

      const mockDataUserReceived = {
        error: 'wrongPassowrd',
        token: null,
        user: null,
      };

      const mockMOdel = jest
        .spyOn(users, 'login')
        .mockResolvedValue(mockDataUserReceived);

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      try {
        await usersController.login(mockReq, mockRes);
      } catch (err) {
        const {
          output: {
            payload: { statusCode, message },
          },
        } = err;

        expect(statusCode).toBe(400);

        expect(message).toBe('Wrong Password');
      } finally {
        expect(mockMOdel).toHaveBeenCalledTimes(1);

        expect(mockMOdel).toHaveBeenCalledWith({
          email: mockEmail,
          password: mockPassword,
        });

        expect(mockRes.status).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('Register User', () => {
    it('on success', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockToken = faker.random.hexaDecimal();

      const mockReq = {
        body: { email: mockEmail, password: mockPassword },
      };

      const mockMOdel = jest
        .spyOn(users, 'register')
        .mockResolvedValue({ error: null });

      jest.spyOn(users, 'login').mockResolvedValue({ token: mockToken });

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.register(mockReq, mockRes);

      expect(mockMOdel).toHaveBeenCalledTimes(1);

      expect(mockMOdel).toHaveBeenCalledWith({
        email: mockEmail,
        password: mockPassword,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(201);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        token: mockToken,
        message: 'User created with success!',
      });
    });

    it('on failure - user exists', async () => {
      const mockEmail = faker.internet.email();

      const mockPassword = faker.internet.password();

      const mockReq = { body: { email: mockEmail, password: mockPassword } };

      const mockMOdel = jest
        .spyOn(users, 'register')
        .mockResolvedValue({ error: 'existUser' });

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      try {
        await usersController.register(mockReq, mockRes);
      } catch (err) {
        const {
          output: {
            payload: { statusCode, message },
          },
        } = err;

        expect(statusCode).toBe(400);

        expect(message).toBe('Email already registered');
      } finally {
        expect(mockMOdel).toHaveBeenCalledTimes(1);

        expect(mockMOdel).toHaveBeenCalledWith({
          email: mockEmail,
          password: mockPassword,
        });

        expect(mockRes.status).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('Update User', () => {
    it('on success', async () => {
      const mockName = faker.name.findName();

      const mockReq = { body: { displayName: mockName } };

      const mockMOdel = jest
        .spyOn(users, 'update')
        .mockResolvedValue({ error: null });

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.update(mockReq, mockRes);

      expect(mockMOdel).toHaveBeenCalledTimes(1);

      expect(mockMOdel).toHaveBeenCalledWith({
        displayName: mockName,
      });

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        message: 'User update with sucess!',
      });
    });

    it('on failure - user not found', async () => {
      const mockName = faker.name.findName();

      const mockReq = { body: { displayName: mockName } };

      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      const mockMOdel = jest
        .spyOn(users, 'update')
        .mockResolvedValue({ error: 'userNotFound' });

      try {
        await usersController.update(mockReq, mockRes);
      } catch (err) {
        const {
          output: {
            payload: { statusCode, message },
          },
        } = err;

        expect(statusCode).toBe(400);

        expect(message).toBe('User not exists');
      } finally {
        expect(mockMOdel).toHaveBeenCalledTimes(1);

        expect(mockMOdel).toHaveBeenCalledWith({ displayName: mockName });

        expect(mockRes.status).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('Valid Token', () => {
    it('on sucess', async () => {
      const mockJson = jest.fn();

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.validToken(null, mockRes);

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);
    });
  });

  describe('Get User', () => {
    it('on sucess', async () => {
      const mockName = faker.name.findName();

      const mockJson = jest.fn();

      const mockReq = { user: { displayName: mockName } };

      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      await usersController.getUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledTimes(1);

      expect(mockRes.status).toHaveBeenCalledWith(200);

      expect(mockJson).toHaveBeenCalledTimes(1);

      expect(mockJson).toHaveBeenCalledWith({
        displayName: mockName,
      });
    });
  });
});
