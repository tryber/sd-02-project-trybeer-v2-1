import React from 'react';
import { chatDateFormatter } from '../../../../../services/DateFormat';
import './style.css';

const Message = ({ message: { message, date, sentby }, user }) => {
  const yourMessage = (sentby === 'client');

  return (
    <div
      className="message_comp-3r32"
      style={{
        "backgroundColor": (!yourMessage) ? '#e6e5ea' : '#44b5fb',
        "color": (!yourMessage) ? 'black' : 'white',
      }}
    >
      <div className="user">
        <p data-testid="nickname">{(yourMessage) ? 'Loja' : user.email}</p> 
        <p data-testid="message-time">{chatDateFormatter(date)}</p>
      </div>
      <div className="message">
        <p data-testid="text-message">{message}</p>
      </div>
    </div>
  );
};

export default Message;