/* eslint-disable react/prop-types */
import React from 'react';

import { Route } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import CreateEventForm from '../../components/Create-event-form';
import LogInModal from '../../components/Login-modal';

function CalendarPage({ users, events, onEventDelete, onEventPost }) {
  return (
    <>
      <Route path="/meeting-planning-calendar-react" exact>
        <LogInModal users={users} />
        <Calendar users={users} events={events} onEventDelete={onEventDelete} />
      </Route>

      <Route path="/meeting-planning-calendar-react/create-event">
        <CreateEventForm users={users} onEventPost={onEventPost} />
      </Route>
    </>
  );
}

export default CalendarPage;
