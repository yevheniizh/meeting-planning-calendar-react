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

function CalendarPage({ users, loadingUsers, loadedUsers, errorUsers }) {
  const initialState = { notificationsStore: [] };

  function reducer(state, action) {
    const croppedNotifications = [
      ...state.notificationsStore.slice(state.notificationsStore.length - 5),
    ];

    switch (action.type) {
      case 'increment':
        return {
          notificationsStore: [
            ...croppedNotifications,
            action.newNotificationData,
          ],
        };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setNewNotification = (notification) => {
    const newNotificationData = {
      notification,
      isShow: true,
      handleIsShow() {
        setTimeout(() => (newNotificationData.isShow = false), 2000);
      },
    };

    newNotificationData.handleIsShow();

    dispatch({
      type: 'increment',
      newNotificationData,
    });
  };

  // set Notification after getting users
  useEffect(() => {
    if (!loadingUsers && loadedUsers) {
      // check if users downloaded, but no data
      if (users[0].data.name === 'guest') {
        return setNewNotification(
          <Notification
            message="API: users downloaded successfully, but...
            no data yet"
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
      <Notification message="API: error" status="error" />;
    }

    return setNewNotification(
      <Notification message="API: something went wrong" status="warning" />
    );
  }, [loadingUsers, loadedUsers, errorUsers]);

  const renderedNotifications = state.notificationsStore.map(
    ({ notification, isShow }) => {
      if (isShow === true)
        return <React.Fragment key={uuid()}>{notification}</React.Fragment>;

      return null;
    }
  );

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
}))(CalendarPage);
