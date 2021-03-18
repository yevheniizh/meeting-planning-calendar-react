/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { v4 as uuid } from 'uuid';

import { Route } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import CreateEventForm from '../../components/Create-event-form';
import LogInModal from '../../components/Login-modal';

function CalendarPage({ newNotification }) {
  const [notifications, setNotification] = useState([]);

  const setNewNotification = (notification) =>
    setNotification([
      ...notifications.slice(notifications.length - 5),
      notification,
    ]);

  useEffect(() => {
    setNewNotification(newNotification);
  }, [newNotification]);

  return (
    <>
      <Route path="/meeting-planning-calendar-react" exact>
        <LogInModal />
        <Calendar setNewNotification={setNewNotification} />
      </Route>

      <Route path="/meeting-planning-calendar-react/create-event">
        <CreateEventForm setNewNotification={setNewNotification} />
      </Route>

      {/* Notifications container  */}
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          {notifications.map((notification) => (
            <React.Fragment key={uuid()}>{notification}</React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
