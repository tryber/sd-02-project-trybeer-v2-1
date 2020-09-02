const mysqlx = require('@mysql/xdevapi');

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

module.exports = {
  connection,
};
