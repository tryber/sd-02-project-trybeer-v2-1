import React, { useState } from "react";

import MessagesContainer from '../../../components/MessagesContainer';
import Menu from '../Menu';
import Messages from './Messages';
import SendField from '../../../components/SendField';

import "./style.css";

const handleSubmit = (setMessages) => (input) => {
  if (input) {
    setMessages((curr) => [...curr, { message: input, date: new Date(), sentby: 'admin' }]);
    // socket.emit('send-message', { message, yourUser });
  }
};

const Chat = (props) => {
  const { email } = props.match.params;
  const [user, setUser] = useState({ id: 'id', email: 'voce@gmail.com' });
  const [messages, setMessages] = useState([
    { message: 'Olá também', date: new Date(), sentby: 'client' },
    { message: 'Olá', date: new Date(), sentby: 'admin' },
  ]);

  // email1@gmail.com: {
  //   messages: [{ message, date, sentby: 'admin' || 'clinet' }],
  // }

  return (
    <div className="chat_admin_page">
      <Menu />
      <div className="chat_admin_container">
        <MessagesContainer messages={messages} user={user} />
        <SendField handleSubmit={handleSubmit(setMessages)} sentby="admin" />
      </div>
    </div>
  );
};

export default Chat;
