/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react';
import { Modal } from 'bootstrap';
import LogInModal from '../../components/Login-modal';
import { userContext } from '../../contexts/user-context';
import Calendar from '../../components/Calendar/Calendar';

function CalendarPage({ users }) {
  const { sessionUser } = useContext(userContext);
  const [isSessionUser, handleIsSessionUser] = useState(false);

  useEffect(() => {
    if (users && !isSessionUser) {
      const myModal = new Modal(document.querySelector('#staticBackdrop'));
      myModal.show();

      if (sessionUser) {
        setTimeout(() => myModal.hide(), 200);

        setTimeout(() => {
          handleIsSessionUser(true);
          document.querySelector('.modal-backdrop').remove();
        }, 400);
      }
    }
  }, [users, sessionUser, isSessionUser]);

  if (isSessionUser) {
    return <Calendar />;
  }

  return <LogInModal users={users} />;
}

export default CalendarPage;
