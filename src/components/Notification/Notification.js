/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';

import { v4 as uuid } from 'uuid';

import './style.scss';

function Notification({ message, status }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <Toast key={uuid()} show={show} delay={2000} autohide>
      <Toast.Body className={`calendar__toast_${status}`}>{message}</Toast.Body>
    </Toast>
  );
}

export default Notification;
