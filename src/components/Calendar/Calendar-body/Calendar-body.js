/* eslint-disable react/prop-types */
import React from 'react';
import CalendarTableColumn from './Calendar-table-column';
import CalendarTableHoursColumn from './Calendar-table-hours-column';

function CalendarBody({ events, onEventDelete }) {
  return (
    <div className="calendar__table">
      <ul className="calendar__table-column" data-day="Name">
        <li className="calendar__table-column-header">Name</li>
        <CalendarTableHoursColumn />
      </ul>

      <ul className="calendar__table-column" data-day="Mon">
        <li className="calendar__table-column-header">Mon</li>
        <CalendarTableColumn
          day="Mon"
          events={events}
          onEventDelete={onEventDelete}
        />
      </ul>

      <ul className="calendar__table-column" data-day="Tue">
        <li className="calendar__table-column-header">Tue</li>
        <CalendarTableColumn
          day="Tue"
          events={events}
          onEventDelete={onEventDelete}
        />
      </ul>

      <ul className="calendar__table-column" data-day="Wed">
        <li className="calendar__table-column-header">Wed</li>
        <CalendarTableColumn
          day="Wed"
          events={events}
          onEventDelete={onEventDelete}
        />
      </ul>

      <ul className="calendar__table-column" data-day="Thu">
        <li className="calendar__table-column-header">Thu</li>
        <CalendarTableColumn
          day="Thu"
          events={events}
          onEventDelete={onEventDelete}
        />
      </ul>

      <ul className="calendar__table-column" data-day="Fri">
        <li className="calendar__table-column-header">Fri</li>
        <CalendarTableColumn
          day="Fri"
          events={events}
          onEventDelete={onEventDelete}
        />
      </ul>
    </div>
  );
}

export default CalendarBody;
