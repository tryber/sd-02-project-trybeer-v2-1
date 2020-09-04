const express = require('express');

const rescue = require('express-rescue');

const { messages } = require('../controllers');

const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth, rescue(messages.getAll));

module.exports = router;
