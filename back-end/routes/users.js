const express = require('express');

const rescue = require('express-rescue');

const { users } = require('../controllers');

const {
  joinSchemas: {
    userSchema: { loginSchema, profileSchema, registerSchema },
  },
} = require('../services/utils');

const { validate, auth } = require('../middlewares');

const router = express.Router();

router.post('/login', validate(loginSchema), rescue(users.login));

router
  .route('/profile')
  .get(auth, rescue(users.find))
  .patch(auth, validate(profileSchema), rescue(users.update));

router.post('/register', validate(registerSchema), rescue(users.register));

router.route('/token').get(auth, rescue(users.validToken));

router.route('/getUser').get(auth, rescue(users.getUser));

module.exports = router;
