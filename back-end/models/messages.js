const { getMongoSchema } = require('./connection');

const getMessagesForEmail = async (email) => {
  const results = await getMongoSchema().then((db) => db.collection('Messages').find({ email }).toArray());
  return results[0];
};

const updateNewMessage = async (yourUser, message) => getMongoSchema().then((db) => (
  db.collection('Messages').updateOne(
    { email: yourUser.email },
    { $push: { messages: { message, date: new Date(), sentby: yourUser.role } } },
    { upsert: true },
  )
));

const insertNewUser = async (yourUser, message) => getMongoSchema().then((db) => (
  db.collection('Messages').insertOne(
    {
      email: yourUser.email,
      messages: [{ message, date: new Date(), sentby: yourUser.role }],
    },
  )
));

const postNewMessage = async (message, yourUser) => {
  const findEmail = await getMessagesForEmail(yourUser.email) || {};
  if (!findEmail.email) {
    await insertNewUser(yourUser, message);
  }
  if (findEmail.email) {
    await updateNewMessage(yourUser, message);
  }
  return getMessagesForEmail(yourUser.email);
};

const getAllMessages = async () => getMongoSchema().then((db) => db.collection('Messages').find().toArray());

module.exports = { getMessagesForEmail, postNewMessage, getAllMessages };
