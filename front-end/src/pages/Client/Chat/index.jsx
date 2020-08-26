import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

import Header from '../../../components/Header';
import MessagesContainer from '../../../components/MessagesContainer';
import SendField from '../../../components/SendField';

import './style.css';


const handleSubmit = (setMessages, socket) => (input) => {
  if (input) {
    const newMessage = { message: input, date: new Date(), sentby: 'client' };
    setMessages((curr) => [...curr, newMessage]);
    socket.emit('send-message', newMessage);
  }
};

const Chat = () => {
  const [user, setUser] = useState({ id: 'id', email: 'voce@gmail.com' });
  const [messages, setMessages] = useState([
    { message: 'Olá também', date: new Date(), sentby: 'client' },
    { message: 'Olá', date: new Date(), sentby: 'admin' },
  ]);
  const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);

  useEffect(() => {
    socket.on('receive-message', (message) => {
      setMessages((curr) => [...curr, message]);
    });

    return () => { socket.destroy(); }
  }, [socket]);

  return (
    <div className="chat_comp">
      <Header title="Chat da loja" />
      <MessagesContainer messages={messages} user={user} />
      <SendField handleSubmit={handleSubmit(setMessages, socket)} sentby="client" />
    </div>
  );
};

export default Chat;
