import React from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertMessage({ type, message, onClose }) {
  return (
    <Alert variant={type} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
}

export default AlertMessage;
