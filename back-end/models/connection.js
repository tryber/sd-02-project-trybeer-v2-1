const mysqlx = require('@mysql/xdevapi');
const { MongoClient } = require('mongodb');

const config = {
  user: 'root',
  password: process.env.DB_PASSWORD || '',
  host: 'localhost',
  port: 33060,
};

function connection() {
  return mysqlx
    .getSession(config)
    .then((session) => session.getSchema(process.env.DB_SCHEMA))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

const MONGO_DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'Chat';

const getMongoSchema = async () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch(() => {
    process.exit(1);
  });

module.exports = {
  connection,
  getMongoSchema,
};
