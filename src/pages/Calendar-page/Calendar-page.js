/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';

import { v4 as uuid } from 'uuid';

import { Route } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import CreateEventForm from '../../components/Create-event-form';
import LogInModal from '../../components/Login-modal';
import Notification from '../../components/Notification';

function CalendarPage({
  users,
  loadingUsers,
  loadedUsers,
  errorUsers,
  events,
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

  // set Notification after getting users
  useEffect(() => {
    if (!loadingUsers && loadedUsers) {
      // check if users downloaded, but no data
      if (users[0].data.name === 'guest') {
        return setNewNotification(
          <Notification
            message="API: users downloaded successfully, but... no data yet"
            status="successful"
          />
        );
      }

      return setNewNotification(
        <Notification
          message="API: users downloaded successfully"
          status="successful"
        />
      );
    }

    if (errorUsers) {
      return setNewNotification(
        <Notification message="API: error with loading users" status="error" />
      );
    }

    if (!loadingEvents && !loadedEvents) {
      return setNewNotification(
        <Notification
          message="API: something went wrong with loading users"
          status="warning"
        />
      );
    }
  }, [loadingUsers, loadedUsers, errorUsers]);

  useEffect(() => {
    if (!loadingEvents && loadedEvents) {
      // check if events downloaded, but no data
      if (!events.length) {
        return setNewNotification(
          <Notification
            message="API: events downloaded successfully, but... no data yet"
            status="successful"
          />
        );
      }

      return setNewNotification(
        <Notification
          message="API: events downloaded successfully"
          status="successful"
        />
      );
    }

    if (errorEvents) {
      return setNewNotification(
        <Notification message="API: error with loading events" status="error" />
      );
    }

    if (!loadingEvents && !loadedEvents) {
      return setNewNotification(
        <Notification
          message="API: something went wrong with loading events"
          status="warning"
        />
      );
    }
  }, [loadingEvents, loadedEvents, errorEvents]);

  const renderedNotifications = state.map(({ id, notification }) => {
    window.setTimeout(() => {
      const data = {
        id,
      };

      dispatch({
        type: 'deleteNotification',
        data,
      });
    }, 2000);

    return <React.Fragment key={id}>{notification}</React.Fragment>;
  });

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
