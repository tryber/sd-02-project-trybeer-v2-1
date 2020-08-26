import React, { useState } from "react";

import Menu from '../Menu';
import Email from './Email';
import SendField from '../../../components/SendField';

import "./style.css";

const handleSubmit = (input) => {
  if (input) {
    // socket.emit('send-message', { message, yourUser });
  }
};

const TransmitionLine = () => {
  const [emails, setEmails] = useState(['ahy@gamil.com', 'uuhy@gamil.com']);
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
        <SendField handleSubmit={handleSubmit} sentby="admin" />
      </div>
    </div>
  );
};

export default TransmitionLine;
