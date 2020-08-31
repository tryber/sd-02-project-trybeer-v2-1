const socketIoServer = require('http').createServer();
const io = require('socket.io')(socketIoServer);
const messages = require('./controllers/messages');

const admin = io.of('/admins');

const adminConnection = () => {
  socketIoServer.listen(4555);
  console.log('Socket.io ouvindo na porta 4555');
}

const socketConnection = () => {
  io.on('connection', (socket) => {
  let admin = [];
    socket.on('get-messsages', async ({ email }) => {
      const results = await messages.getMessages(email);
      socket.emit('receive-all-messages', { messages: results });
    });

    socket.on('send-message', async (message) => {

    });

    io.on('connection', () => {
      console.log(`Client ${socket.id} conectado`);
    });

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} desconectado`);
    });
  });
  socketIoServer.listen(4555);
  console.log('Socket.io ouvindo na porta 4555');
};

module.exports = socketConnection;
