const products = [
  {
    name: 'Skol Lata',
    price: 2.2,
    volume: 250,
    urlImage: 'http://localhost:3001/images/1.png',
  },
  {
    name: 'Heineken',
    price: 7.5,
    volume: 600,
    urlImage: 'http://localhost:3001/images/2.png',
  },
  {
    name: 'Antarctica Pilsen',
    price: 2.49,
    volume: 300,
    urlImage: 'http://localhost:3001/images/3.jpeg',
  },
  {
    name: 'Brahma',
    price: 7.5,
    volume: 600,
    urlImage: 'http://localhost:3001/images/4.png',
  },
  {
    name: 'Skol',
    price: 2.19,
    volume: 219,
    urlImage: 'http://localhost:3001/images/5.png',
  },
  {
    name: 'Skol Beats Senses',
    price: 4.49,
    volume: 313,
    urlImage: 'http://localhost:3001/images/6.png',
  },
  {
    name: 'Becks',
    price: 4.99,
    volume: 330,
    urlImage: 'http://localhost:3001/images/7.png',
  },
  {
    name: 'Brahma Duplo Malte',
    price: 2.79,
    volume: 350,
    urlImage: 'http://localhost:3001/images/8.png',
  },
  {
    name: 'Becks',
    price: 8.89,
    volume: 600,
    urlImage: 'http://localhost:3001/images/9.png',
  },
  {
    name: 'Skol Beats Senses',
    price: 3.57,
    volume: 269,
    urlImage: 'http://localhost:3001/images/10.png',
  },
  {
    name: 'Stella Artoi s',
    price: 3.49,
    volume: 275,
    urlImage: 'http://localhost:3001/images/11.png',
  },
];

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products', products);
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null);
  },
};
