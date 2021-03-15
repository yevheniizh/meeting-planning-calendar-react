/* eslint-disable react/prop-types */
import React from 'react';
import Calendar from '../../components/Calendar/Calendar';
import LogInModal from '../../components/Login-modal';

function CalendarPage({ users, events, onEventDelete }) {
  return (
    <>
      <LogInModal users={users} />
      <Calendar users={users} events={events} onEventDelete={onEventDelete} />
    </>
  );
}

export default CalendarPage;
