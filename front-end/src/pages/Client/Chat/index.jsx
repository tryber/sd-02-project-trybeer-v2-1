import React, { useState } from "react";

import Header from '../../../components/Header';
import MessagesContainer from '../../../components/MessagesContainer';
import SendField from '../../../components/SendField';
import { getUser } from '../../../services/Request';

import './style.css';


const handleSubmit = (setMessages) => (input) => {
  if (input) {
    setMessages((curr) => [...curr, { message: input, date: new Date(), sentby: 'client' }]);
    // socket.emit('send-message', { message, yourUser });
  }
};
// { message: 'Olá', date: new Date(), sentby: 'admin' },
// { message: 'Olá também', date: new Date(), sentby: 'client' },

const Chat = () => {
  const [user, setUser] = useState({ id: 'id', email: 'voce@gmail.com' });
    const [messages, setMessages] = useState([]);
  const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:4555');

  useEffect(() => {
    const getMessages = async () => {
      getUser('http://localhost:3001/users/getUser')
        .then(({ data }) => {
          socket.emit('get-messsages', { email: data.email });
          setUser({ ...data });
        });
    };
    getMessages();
  }, []);

  socket.on('receive-message', (message) => {
    setMessages((curr) => [...curr, message]);
  });

  socket.on('receive-all-messages', ({ messages }) => {
    setMessages(messages)
  });

  return (
    <div className="chat_comp">
      <Header title="Chat da loja" />
      <MessagesContainer messages={messages} user={user} />
      <SendField handleSubmit={handleSubmit(setMessages)} sentby="client" />
    </div>
  );
};

export default Chat;
