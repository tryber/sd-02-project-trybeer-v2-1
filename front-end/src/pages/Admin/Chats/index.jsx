import React, { useState } from "react";

import Menu from '../Menu';
import Chat from './Chat';

import "./style.css";


const Chats = () => {
  const [chats, setChats] = useState([{ id: 'qdw', email: 'andyr@gmail.com', date: new Date() }]);
  return (
    <div className="chats_admin">
      <Menu />
      <div className="container">
        <div className="header">
          <p>Conversas</p>
          <button type="button">Nova linha de transmissão</button>
        </div>
        <div className="chats_container">
          {chats.map((chat) => (
            <Chat key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chats;
