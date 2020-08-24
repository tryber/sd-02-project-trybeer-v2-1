import React, { useEffect, useContext } from "react";
import { Context } from "../../context";
import "./style.css";

const types = {
  ALERT: "#e71d36",
  SUCCESS: "#49b76d",
  NEUTRAL: "white",
};

const createTimeout = ({ infinity, setMessage }) => {
  if (!infinity) {
    setTimeout(() => {
      setMessage({ value: "", type: "" });
    }, 2500);
  }
};

const Message = ({ infinity }) => {
  const {
    setMessage,
    message: { value, type },
  } = useContext(Context);

  useEffect(() => {
    createTimeout({ infinity, setMessage });

    return () => {
      setMessage({ value: '', type: '' });
    };
  }, []);

  return (
    <div
      className="message_comp"
      data-testid="message"
      style={{ display: value ? "flex" : "none" }}
    >
      <button type="button" onClick={() => setMessage({ value: "", type: "" })}>
        <span className="material-icons">close</span>
      </button>
      <strong data-testid="message-text" style={{ color: `${types[type]}` }}>
        {value}
      </strong>
    </div>
  );
};

export default Message;
