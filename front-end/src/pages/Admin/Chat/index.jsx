import React, { useState, useEffect } from "react";

import MessagesContainer from '../../../components/MessagesContainer';
import SendField from '../../../components/SendField';
import { getUser } from '../../../services/Request';
import io from 'socket.io-client';

import './style.css';
import Menu from "../Menu";


const handleSubmit = ({ role }, email) => async (input) => {
  if (input) {
    const socket = io('http://localhost:4555/');
    await socket.emit('send-message', { message: input, yourUser: { role, email } });
    socket.disconnect();
  }
};

const socket = io('http://localhost:4555/admin');
const Chat = ({ location: { state: { email } } }) => {

  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      await getUser('http://localhost:3001/users/getUser')
        .then(({ data }) => {
          socket.emit('get-messsages', { email });
          setUser({ ...data, sentby: 'admin' });
        });
    };
    getMessages();

  }, [email]);

  socket.on('new message', ({ messages }) => {
    setMessages([...messages]);
  });
  socket.on('receive-all-messages', ({ messages }) => {
    setMessages(messages);
  });

  return (
    <div className="chat_comp">
      <Menu title={email} />
      <div className="content_chat">
        <MessagesContainer messages={messages} user={user} />
        <SendField handleSubmit={handleSubmit(user, email)} sentby="admin" />
      </div>
    </div>
  );
};

export default Chat;
