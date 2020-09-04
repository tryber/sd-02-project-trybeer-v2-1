import React from "react";
import { chatDateFormatter } from '../../../services/DateFormat';
import "./style.css";

const switchClient = (user, yourMessage, email) => {
  switch (user.role) {
    case 'admin': {
      return (yourMessage) ? 'Loja' : email
    }
    case 'client': {
      return (!yourMessage) ? 'Loja' : user.email
    }
  }
}

const Message = ({ message: { message, date, sentby }, user, email }) => {
  const yourMessage = (sentby === user.role);
  return (
    <div
      className="message_comp-g5h"
      style={{
        "backgroundColor": (!yourMessage) ? '#e6e5ea' : '#44b5fb',
        "color": (!yourMessage) ? 'black' : 'white',
      }}
    >
      <div className="user">
        <p data-testid="nickname">{switchClient(user, yourMessage, email)}</p>
        <p data-testid="message-time">{chatDateFormatter(date)}</p>
      </div>
      <div className="message">
        <p data-testid="text-message">{message}</p>
      </div>
    </div>
  );
};

export default Message;