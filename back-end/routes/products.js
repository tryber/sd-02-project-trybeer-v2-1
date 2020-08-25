const express = require('express');

const rescue = require('express-rescue');

const { products } = require('../controllers');

const { auth } = require('../middlewares');

const router = express.Router();

router.get('/', auth, rescue(products.list));

module.exports = router;
