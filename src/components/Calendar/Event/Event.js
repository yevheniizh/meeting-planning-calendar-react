/* eslint-disable react/prop-types */
import React from 'react';

function Event({ event, onEventDelete }) {
  const isDeleteEvent = () => {
    const modal = global.confirm(
      `Are you sure you want to delete '${event.data.name}' event?`
    );

    if (modal) {
      onEventDelete(event.id);
    }
  };

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
        onClick={isDeleteEvent}
      >
        &times;
      </button>
    </div>
  );
}

export default Event;
