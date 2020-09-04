const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);
const messages = require('./controllers/messages');

const messagesFromLogin = async (socket, email) => {
  const results = await messages.getMessages(email);
  socket.emit('receive-all-messages', { messages: results.messages });
};

const socketConnection = () => {
  let users = [];
  const admin = io.of('/admin');

  admin.on('connection', (socket) => {
    socket.on('get-messsages', async ({ email }) => messagesFromLogin(socket, email));
    socket.on('send-message', async (params) => {
      const results = await messages.saveMessage(params);
      admin.emit('new message', { messages: results.messages });
    });
  });

  io.on('connection', (socket) => {
    socket.on('get-messsages', async ({ email }) => {
      users = [...users, { email, id: socket.id }];
      await messagesFromLogin(socket, email);
    });

    socket.on('send-message', async (params) => {
      const results = await messages.saveMessage(params);
      const user = users.filter((ele) => ele.email === params.yourUser.email);
      if (user.length > 0) {
        io.to(user[user.length - 1].id).emit('new message', { messages: results.messages });
      }
      admin.emit('new message', { messages: results.messages });
    });
  });
  socketIoServer.listen(4555);
};

module.exports = socketConnection;
