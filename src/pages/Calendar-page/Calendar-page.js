/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';
import LogInModal from '../../components/Login-modal';
// import Calendar from '../../components/Calendar/Calendar';

function CalendarPage({ users }) {
  useEffect(() => {
    if (users) {
      const myModal = new Modal(document.querySelector('#staticBackdrop'), {});

      myModal.show();
    }
  }, [users]);

  return <LogInModal users={users} />;
}

export default CalendarPage;
