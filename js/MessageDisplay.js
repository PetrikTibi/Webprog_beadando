import React from 'react';

const MessageDisplay = ({ message }) => {
  return (
    <div>{message && <p>{message}</p>}</div>
  );
};

export default MessageDisplay;
