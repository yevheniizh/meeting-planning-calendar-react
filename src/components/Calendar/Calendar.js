/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CalendarHeader from './Calendar-header';
import CalendarBody from './Calendar-body';
import CalendarFooter from './Calendar-footer';

import './style.scss';

function Calendar({ onEventDelete }) {
  const [sortingBy, setSortingBy] = useState('All members');

  return (
    <div className="calendar">
      <CalendarHeader setSortingBy={setSortingBy} />
      <CalendarBody onEventDelete={onEventDelete} sortingBy={sortingBy} />
      <CalendarFooter />
    </div>
  );
}

export default Calendar;
