import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

import Menu from '../Menu';
import Email from './Email';
import SendField from '../../../components/SendField';

import "./style.css";

const handleSubmit = (socket) => (input) => {
  if (input) {
    const newMessage = { message: input, date: new Date(), sentby: 'admin' };
    socket.emit('send-message-all', newMessage);
  }
};

const TransmitionLine = () => {
  const [emails, setEmails] = useState(['ahy@gamil.com', 'uuhy@gamil.com']);
  const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);

  useEffect(() => {
    return () => { socket.destroy(); }
  }, [socket]);

  return (
    <div className="trans_admin_page">
      <Menu />
      <div className="container">
        <p>Transmition</p>
        <div className="container-email">
          {emails.map((email) => (
            <Email key={email} email={email} />
          ))}
        </div>
        <SendField handleSubmit={handleSubmit(socket)} sentby="admin" />
      </div>
    </div>
  );
};

export default TransmitionLine;
