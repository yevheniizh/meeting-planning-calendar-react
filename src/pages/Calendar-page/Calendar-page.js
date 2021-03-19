/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import { v4 as uuid } from 'uuid';

import { Route } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import CreateEventForm from '../../components/Create-event-form';
import LogInModal from '../../components/Login-modal';
import NotifyUsersStatus from '../../components/Notification/NotifyUsersStatus';
import NotifyEventsStatus from '../../components/Notification/NotifyEventsStatus';

function CalendarPage({
  loadingUsers,
  loadedUsers,
  errorUsers,
  loadingEvents,
  loadedEvents,
  errorEvents,
}) {
  function reducer(state, action) {
    const { type, data } = action;

    switch (type) {
      case 'showNotification':
        return [...state, data];

      case 'deleteNotification':
        return state.filter((i) => i.id !== data.id);

      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, []);

  const setNewNotification = (notification) => {
    const data = {
      id: uuid(),
      notification,
    };

    dispatch({
      type: 'showNotification',
      data,
    });
  };

  const renderedNotifications = state.map(({ id, notification }) => {
    window.setTimeout(() => {
      const data = {
        id,
      };

      dispatch({
        type: 'deleteNotification',
        data,
      });
    }, 2500);

    return <React.Fragment key={id}>{notification}</React.Fragment>;
  });

  // set Notification after getting users
  useEffect(() => {
    if (loadingUsers && !loadedUsers) return;
    setNewNotification(<NotifyUsersStatus />);
  }, [loadingUsers, loadedUsers, errorUsers]);

  // set Notification after getting events
  useEffect(() => {
    if (loadingEvents && !loadedEvents) return;
    setNewNotification(<NotifyEventsStatus />);
  }, [loadingEvents, loadedEvents, errorEvents]);

  return (
    <>
      <Route path="/meeting-planning-calendar-react" exact>
        <LogInModal />
        <Calendar setNewNotification={setNewNotification} />
      </Route>

      <Route path="/meeting-planning-calendar-react/create-event">
        <CreateEventForm setNewNotification={setNewNotification} />
      </Route>

      {/* Notifications container  */}
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          {renderedNotifications}
        </div>
      </div>
    </>
  );
}

export default connect((state) => ({
  users: state.users.entities,
  loadingUsers: state.users.loading,
  loadedUsers: state.users.loaded,
  errorUsers: state.users.error,
  events: state.events.entities,
  loadingEvents: state.events.loading,
  loadedEvents: state.events.loaded,
  errorEvents: state.events.error,
}))(CalendarPage);
