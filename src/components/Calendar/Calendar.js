/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CalendarHeader from './Calendar-header';
import CalendarBody from './Calendar-body';
import CalendarFooter from './Calendar-footer';

import './style.scss';

function Calendar({ events, onEventDelete }) {
  const [sortingBy, setSortingBy] = useState('All members');

  return (
    <div className="calendar">
      <CalendarHeader setSortingBy={setSortingBy} />
      <CalendarBody
        events={events}
        onEventDelete={onEventDelete}
        sortingBy={sortingBy}
      />
      <CalendarFooter />
    </div>
  );
}

export default Calendar;
