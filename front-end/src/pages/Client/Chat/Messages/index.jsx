import React from "react";
import Message from './Message';
import './style.css';


const Messages = ({ messages, user }) => {
  return (
    <div className="messages_comp">
      {messages.map((message, index) => (
        <Message key={`message-${index}`} message={message} user={user} />
      ))}
    </div>
  );
};

export default Messages;
