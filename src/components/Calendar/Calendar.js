/* eslint-disable react/prop-types */
import React from 'react';
import CalendarHeader from './Calendar-header';
import CalendarBody from './Calendar-body';
import CalendarFooter from './Calendar-footer';

import './style.scss';

function Calendar({ users, events, onEventDelete }) {
  return (
    <div className="calendar">
      <CalendarHeader users={users} />
      <CalendarBody events={events} onEventDelete={onEventDelete} />
      <CalendarFooter />
    </div>
  );
}

export default Calendar;
