/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function Event({ event }) {
  const [isDeleteEvent, setIsDeleteEvent] = useState(false);
  const deleteEvent = () => {
    const modal = global.confirm(
      `Are you sure you want to delete '${event.data.name}' event?`
    );

    if (modal) {
      setIsDeleteEvent(true);
    }
  };

  useEffect(() => {
    if (isDeleteEvent) {
      fetch(
        `http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events/${event.id}`,
        {
          method: 'DELETE',
        }
      )
        .then((response) => {
          if (response.ok) console.log('Event deleted succesfully');
        })
        .catch((error) => console.log(error));
    }

    setIsDeleteEvent(false);
  }, [isDeleteEvent, event]);

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
        onClick={deleteEvent}
      >
        &times;
      </button>
    </div>
  );
}

export default Event;
