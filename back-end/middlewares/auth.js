const Boom = require('@hapi/boom');

const { users } = require('../models');

const { verifyToken } = require('../services/utils/jsonWebToken');

const auth = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw Boom.badRequest('Token not found');
    }

    const decoded = verifyToken(token);

    const user = await users.find({ key: 'email', value: decoded.data.email });

    if (!user) {
      throw Boom.unauthorized('Error by looking a user with this token');
    }

    const {
      dataValues: { password, ...userWithoutPassword },
    } = user[0];

    req.user = userWithoutPassword;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
