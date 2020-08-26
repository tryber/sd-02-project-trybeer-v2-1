import React from "react";
import Message from './Message';
import './style.css';


const MessagesContainer = ({ messages, user }) => {
  return (
    <div className="messages_comp-23d2">
      {messages.map((message, index) => (
        <Message key={`message-${index}`} message={message} user={user} />
      ))}
    </div>
  );
};

export default MessagesContainer;
