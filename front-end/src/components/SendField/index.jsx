import React, { useState, useRef } from 'react';

import './style.css';


const onChangeHandleMessage = (e, setInput) => {
  const { value } = e.target;
  setInput(value);
};

const handleSubmit = (input, inputRef, cb) => {
  inputRef.current.value = '';
  cb(input);
};

const SendField = ({ handleSubmit: cb }) => {
  const [input, setInput] = useState();
  const inputRef = useRef();

  return (
    <div className="send_field">
      <input
        ref={inputRef}
        placeholder="Envie sua mensagem..."
        required
        data-testid="chat-message"
        onChange={(e) => onChangeHandleMessage(e, setInput)}
      />
      <button
        data-testid="send-message-btn"
        type="button"
        onClick={() => handleSubmit(input, inputRef, cb)}
      >
        Enviar
      </button>
    </div>
  );
};

export default SendField;
