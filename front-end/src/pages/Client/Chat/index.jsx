import React, { useState, useEffect } from "react";

import Header from '../../../components/Header';
import MessagesContainer from '../../../components/MessagesContainer';
import SendField from '../../../components/SendField';
import { getUser } from '../../../services/Request';
import io from 'socket.io-client';

import './style.css';


const handleSubmit = (yourUser, socket) => (input) => {
  if (input) {
    socket.emit('send-message', { message: input, yourUser });
  }
};

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:4555');
const Chat = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      await getUser('http://localhost:3001/users/getUser')
        .then(({ data }) => {
          socket.emit('get-messsages', { email: data.email });
          setUser({ ...data, sentby:'client' });
        });
    };
    getMessages();
  }, []);
  socket.on('new message', ({ messages }) => {
    setMessages([...messages]);
  });

  socket.on('receive-all-messages', ({ messages }) => {
    setMessages(messages || []);
  });

  return (
    <div className="chat_comp">
      <Header title="Chat da loja" />
      <MessagesContainer messages={messages} email={null} user={user} />
      <SendField handleSubmit={handleSubmit(user, socket)} sentby="client" />
    </div>
  );
};

export default Chat;
