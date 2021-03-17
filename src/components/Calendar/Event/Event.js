/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../../../contexts/user-context';
import Notification from '../../Notification';

function Event({ event, onEventDelete, setNewNotification }) {
  const { sessionUser } = useContext(userContext);

  const isDeleteEvent = async () => {
    const modal = global.confirm(
      `Are you sure you want to delete '${event.data.name}' event?`
    );

    if (modal) {
      const isEventDeleted = await onEventDelete(event.id);
      console.log(isEventDeleted);

      if (isEventDeleted) {
        return setNewNotification(
          <Notification
            message="API: event deleted successfully"
            status="successful"
          />
        );
      }

      return setNewNotification(
        <Notification message="Something went wrong" status="warning" />
      );
    }

    return setNewNotification(<Notification message="Action was undone" />);
  };

  const getEvent = () => {
    if (sessionUser && sessionUser.data.rights === 'admin') {
      return (
        <div
          draggable="true"
          data-meeting={event.id}
          data-meeting-day={event.data.day}
          data-meeting-time={event.data.time}
        >
          <div className="calendar__table-column_meeting">
            {event.data.name}
          </div>
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

    return (
      <div
        draggable="true"
        data-meeting={event.id}
        data-meeting-day={event.data.day}
        data-meeting-time={event.data.time}
      >
        <div className="calendar__table-column_meeting">{event.data.name}</div>
      </div>
    );
  };

  const [renedredEvent, renderEvent] = useState(getEvent());

  useEffect(() => {
    renderEvent(getEvent());
  }, [sessionUser]);

  return renedredEvent;
}

export default Event;
