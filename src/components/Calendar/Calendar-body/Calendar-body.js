/* eslint-disable react/prop-types */
import React from 'react';
import CalendarBodyColumn from './Calendar-body-column';
import CalendarBodyHoursColumn from './Calendar-body-hours-column';
import { DAYS } from '../../../utils/constants';

function CalendarBody({ events, onEventDelete, sortingBy }) {
  return (
    <div className="calendar__table">
      <ul className="calendar__table-column" data-day="Name">
        <li className="calendar__table-column-header">Name</li>
        <CalendarBodyHoursColumn />
      </ul>

      {DAYS.map((day) => (
        <ul key={day} className="calendar__table-column" data-day={day}>
          <li className="calendar__table-column-header">{day}</li>
          <CalendarBodyColumn
            day={day}
            events={events}
            onEventDelete={onEventDelete}
            sortingBy={sortingBy}
          />
        </ul>
      ))}
    </div>
  );
}

export default CalendarBody;
