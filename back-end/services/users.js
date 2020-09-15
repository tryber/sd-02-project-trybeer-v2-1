const { users } = require('../models');

const { bcrypt, jsonWebToken } = require('./utils');

const find = async (body) => {
  const user = await users.find({
    key: 'email',
    value: body.email,
  });

  const {
    dataValues: { password, ...userWithoutPassword },
  } = user[0];

  return userWithoutPassword;
};

const login = async (body) => {
  const user = await users.find({ key: 'email', value: body.email });

  if (user.length === 0) {
    return { error: 'userNotFound', token: null };
  }

  const {
    dataValues: { password, ...userWithoutPassword },
  } = user[0];

  const isCorrectPassword = await bcrypt.checkString({
    string: body.password,
    hash: password,
  });

  if (!isCorrectPassword && password !== body.password) {
    return { error: 'wrongPassowrd', token: null };
  }

  const token = jsonWebToken.signToken(userWithoutPassword);

  return { token, user: userWithoutPassword, error: null };
};

const register = async (body) => {
  const user = await users.find({ key: 'email', value: body.email });

  if (user.length !== 0) {
    return { error: 'existUser' };
  }

  const hash = await bcrypt.createHash(body.password);

  await users.register({ ...body, password: hash });

  return { error: null };
};

const update = async ({ name, email }) => {
  const user = await users.find({ key: 'email', value: email });

  if (user.length === 0) {
    return { error: 'userNotFound' };
  }

  await users.update({ name, email });

  return { error: null };
};

module.exports = {
  find,
  login,
  register,
  update,
};
