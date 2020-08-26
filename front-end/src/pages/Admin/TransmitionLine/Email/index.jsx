import React, { useState } from "react";

import "./style.css";

const Email = ({ email }) => {
  return (
    <div className="email_comp">
      <p>{email}</p>
      <input type="checkbox" />
    </div>
  );
};

export default Email;