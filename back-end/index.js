require('dotenv').config();

const cors = require('cors');

const express = require('express');

const bodyParser = require('body-parser');

const path = require('path');

const { error } = require('./middlewares');

const { products, users, orders, admin } = require('./routes');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/orders', orders);

app.use('/admin', admin);

app.use('/products', products);

app.use('/users', users);

app.use(error);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
