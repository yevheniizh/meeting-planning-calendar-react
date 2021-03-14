/* eslint-disable react/prop-types */
import React from 'react';

function Event({ event }) {
  return (
    <div
      draggable="true"
      data-meeting={event.id}
      data-meeting-day={event.data.day}
      data-meeting-time={event.data.time}
      style={{ visibility: 'visible' }}
    >
      <div className="calendar__table-column_meeting">{event.data.name}</div>
      <button
        type="button"
        className="calendar__table-column_meeting_delete"
        data-delete="delete"
      >
        &times;
      </button>
    </div>
  );
}

export default Event;
