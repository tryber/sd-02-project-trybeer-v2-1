const { connection } = require('./connection');

const find = async ({ key, value }) => {
  const user = await connection()
    .then((db) =>
      db
        .getTable('users')
        .select(['id', 'name', 'email', 'password', 'role'])
        .where(`${key} = :${key}`)
        .bind(key, value)
        .execute(),
    )
    .then((results) => results.fetchAll())
    .then((data) => data[0]);
  if (!user) return null;

  const [id, name, email, password, role] = user;

  return { id, name, email, password, role };
};

const register = async ({ name, email, password, role }) =>
  connection().then((db) =>
    db
      .getTable('users')
      .insert(['name', 'email', 'password', 'role'])
      .values(name, email, password, role)
      .execute(),
  );

const update = async ({ name, email }) =>
  connection().then((db) =>
    db
      .getTable('users')
      .update()
      .set('name', name)
      .where('email = :email')
      .bind('email', email)
      .execute(),
  );

module.exports = {
  find,
  register,
  update,
};
