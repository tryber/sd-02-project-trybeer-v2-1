import React, { useState } from "react";

import Header from '../../../components/Header';
import MessagesContainer from '../../../components/MessagesContainer';
import SendField from '../../../components/SendField';

import './style.css';


const handleSubmit = (setMessages) => (input) => {
  if (input) {
    setMessages((curr) => [...curr, { message: input, date: new Date(), sentby: 'client' }]);
    // socket.emit('send-message', { message, yourUser });
  }
};

const Chat = () => {
  const [user, setUser] = useState({ id: 'id', email: 'voce@gmail.com' });
  const [messages, setMessages] = useState([
    { message: 'Olá também', date: new Date(), sentby: 'client' },
    { message: 'Olá', date: new Date(), sentby: 'admin' },
  ]);

  return (
    <div className="chat_comp">
      <Header title="Chat da loja" />
      <MessagesContainer messages={messages} user={user} />
      <SendField handleSubmit={handleSubmit(setMessages)} sentby="client" />
    </div>
  );
};

export default Chat;
