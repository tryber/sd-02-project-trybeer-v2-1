import React from "react";
import { Link } from "react-router-dom";
import { chatDateFormatter } from '../../../../services/DateFormat';

import "./style.css";

const Chat = ({ chat }) => {
  return (
    <Link to={{
      pathname: `chats/${chat.email}`,
      state: {
        email: chat.email
      }
    }}
      className="chat-8h7"
    >
      <strong data-testid="profile-name">{chat.email}</strong>
      <p data-testid="last-message">
        Ultima mensagem às {chatDateFormatter(chat.messages[chat.messages.length - 1].date)}
      </p>
    </Link>
  );
};

export default Chat;
