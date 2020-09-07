import React, { useState, useEffect } from 'react';

import Menu from '../Menu';
import Chat from './Chat';

import './style.css';
import { getData } from '../../../services/Request';

const dateSort = (param) => new Date(param.messages[param.messages.length - 1].date);

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData('http://localhost:3001/messages')
      .then(({ data }) => {
        if (data) setChats(data.messages.sort((a, b) => dateSort(b) - dateSort(a)));
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <h3> Carregando ...</h3>;

  return (
    <div className="chats_admin">
      <Menu />
      <div className="container">
        <div className="header">
          <p>Conversas</p>
        </div>
        <div className="chats_container">
          {chats.length > 0 ? chats.map(({ _id: id, ...chat }) => (
            <Chat key={id} chat={chat} />
          ))
            : <h2 data-testid="text-for-no-conversation">Nenhuma conversa por aqui</h2>}
        </div>
      </div>
    </div>
  );
};

export default Chats;
