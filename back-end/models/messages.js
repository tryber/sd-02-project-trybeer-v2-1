const { getMongoSchema } = require('./connection');

const getMessagesForEmail = async (email) => {
  const results = await getMongoSchema().then((db) =>
    db.collection('Messages').find({ email }).toArray(),
  );
  return results;
}

module.exports = { getMessagesForEmail };