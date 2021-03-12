import React, { useEffect } from 'react';
import { Modal } from 'bootstrap';
import LogInModal from '../../components/Login-modal';
// import Calendar from '../../components/Calendar/Calendar';

function CalendarPage() {
  useEffect(() => {
    const myModal = new Modal(document.querySelector('#staticBackdrop'), {});

    myModal.show();
  });

  return <LogInModal />;
}

export default CalendarPage;
