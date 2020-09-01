import React from "react";
import Message from './Message';
import './style.css';


const MessagesContainer = ({ email, messages, user }) => {
  return (
    <div className="messages_comp-23d2">
      {messages.map((message, index) => (
        <Message key={`message-${index}`} message={message} email={email} user={user} />
      ))}
    </div>
  );
};

export default MessagesContainer;
