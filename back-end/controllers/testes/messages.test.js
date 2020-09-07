const { getMessages, saveMessage, getAll } = require('../messages');
const { getMessagesForEmail, postNewMessage, getAllMessages } = require('../../models/messages');

const { MongoClient } = require('mongodb');
const { getMongoSchema } = require('../../models/connection');

jest.spyOn(MongoClient, 'connect');

const getDbMock = (result) => ({
  db: () => ({
    collection: () => ({
      insertOne: jest.fn().mockResolvedValue({ ops: [result] }),
      find: () => ({
        toArray: jest.fn().mockResolvedValue([result]),
      }),
      updateOne: jest.fn().mockResolvedValue({ result }),
    }),
  }),
});

describe('test controller messages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('getAllMessages', async () => {
    const mockMessages = [
      { email: 'teste@gmail.com', messages: [{ message: 'teste de mensagem' }] },
    ];
    const bdMock = getDbMock(mockMessages);
    const mongo = MongoClient.connect.mockResolvedValueOnce(bdMock);

    const messages = await getMessages('teste@gmail.com');

    expect(messages).toEqual([mockMessages[0]]);
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
  });
  it('saveMessage', async () => {
    const mockMessages = {
      email: 'teste@gmail.com', message: 'teste de mensagem',
    };
    const bdMock = getDbMock(mockMessages);
    const mongo = MongoClient.connect.mockResolvedValue(bdMock);

    const messages = await saveMessage({ message: 'teste', yourUser: { email: 'teste@gmail.com' } });

    expect(messages).toEqual({ "email": "teste@gmail.com", "message": "teste de mensagem" });
    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
  });
  it('saveMessage', async () => {
    const mockMessages = {
    };
    const bdMock = getDbMock(mockMessages);
    const mongo = MongoClient.connect.mockResolvedValue(bdMock);

    await saveMessage({ message: 'teste', yourUser: { email: 'teste@gmail.com' } });

    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
  });
  it('saveMessage', async () => {
    const bdMock = getDbMock(null);
    const mongo = MongoClient.connect.mockResolvedValue(bdMock);

    await saveMessage({ message: 'teste', yourUser: { email: 'teste@gmail.com' } });

    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
  });
  it('getAll', async () => {
    const bdMock = getDbMock({});
    const mongo = MongoClient.connect.mockResolvedValue(bdMock);
    const mockJson = jest.fn();
    const mockRes = { status: jest.fn().mockReturnValueOnce({ json: mockJson }) };
    const mockReq = { user: { id: 1 } };
    await getAll(mockReq, mockRes);
    expect(mockJson).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledTimes(1);
    expect(mockRes.status).toBeCalledWith(200);
    expect(mockJson).toBeCalledWith({ messages: [{}] });

    expect(mongo.mock.calls[0][0]).toBe('mongodb://127.0.0.1:27017');
  });
  it('error teste', async () => {
    MongoClient.connect.mockImplementation(() => Promise.reject('error'));
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => { });
    await getMongoSchema();
    expect(exitMock).toHaveBeenCalledWith(1);
  });
});