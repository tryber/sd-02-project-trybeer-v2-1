import React from "react";

import { useHistory } from "react-router-dom";
import { chatDateFormatter } from '../../../../services/DateFormat';

import "./style.css";


const handleClick = (history, email) => {
  history.push(`chats/${email}`);
};

const Chat = ({ chat }) => {
  const history = useHistory();
  return (
    <div className="chat-8h7" onClick={() => handleClick(history, chat.email)}>
      <strong>{chat.email}</strong>
      <p>Ultima mensagem às {chatDateFormatter(chat.date)}</p>
    </div>
  );
};

export default Chat;
