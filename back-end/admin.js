require('dotenv').config();

const { users } = require('./models');

const {
  bcrypt: { createHash },
} = require('./services/utils');

const createUsers = async (body) => {
  await Promise.all(body.map(async (user) => {
    const hash = await createHash(user.password);
    return users.register({ ...user, password: hash });
  }));

  console.log('Users Created!');

  process.exit(1);
};

createUsers([{
  name: 'tryber',
  email: 'tryber@gmail.com',
  password: '123456',
  role: 'admin',
},
{
  name: 'taylor swift',
  email: 'taylor@gmail.com',
  password: '123456',
  role: 'client',
},
{
  name: 'lana del rey',
  email: 'lana@gmail.com',
  password: '123456',
  role: 'admin',
}]);
