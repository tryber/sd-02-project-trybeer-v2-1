const express = require('express');

const rescue = require('express-rescue');

const { users } = require('../controllers');

const {
  userSchema: { loginSchema, profileSchema, registerSchema },
} = require('../services/utils/joinSchemas');

const { validate, auth } = require('../middlewares');

const router = express.Router();

router.post('/login', validate(loginSchema), rescue(users.login));

router
  .route('/profile')
  .get(auth, rescue(users.find))
  .patch(auth, validate(profileSchema), rescue(users.update));

router.post('/register', validate(registerSchema), rescue(users.register));

router
  .route('/token')
  .get(auth, rescue(users.validToken));

router
  .route('/admin')
  .get(auth, rescue(users.isAdmin));

module.exports = router;

