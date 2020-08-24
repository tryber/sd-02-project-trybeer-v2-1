const express = require('express');

const rescue = require('express-rescue');

const { admin } = require('../controllers');

const { auth } = require('../middlewares');

const router = express.Router();

router.get('/orders', auth, rescue(admin.list));

router.get('/orders/:id', auth, rescue(admin.details));

module.exports = router;
