/* eslint-disable no-return-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useReducer } from 'react';

import { v4 as uuid } from 'uuid';

import { Route } from 'react-router-dom';
import Calendar from '../../components/Calendar/Calendar';
import CreateEventForm from '../../components/Create-event-form';
import LogInModal from '../../components/Login-modal';

function CalendarPage() {
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
          {state.notificationsStore.map(({ notification, isShow }) => {
            if (isShow === true)
              return (
                <React.Fragment key={uuid()}>{notification}</React.Fragment>
              );

            return null;
          })}
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
