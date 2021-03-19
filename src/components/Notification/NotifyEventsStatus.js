/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';

function NotifyEventsStatus({
  events,
  loadingEvents,
  loadedEvents,
  errorEvents,
}) {
  // EVENTS NOTIFICATIONS

  if (!loadingEvents && loadedEvents) {
    // check if events downloaded, but no data
    if (!events.length) {
      return (
        <Notification
          message="API: events downloaded successfully, but... no data yet"
          status="successful"
        />
      );
    }

    return (
      <Notification
        message="API: events downloaded successfully"
        status="successful"
      />
    );
  }

  if (errorEvents) {
    return (
      <Notification message="API: error with loading events" status="error" />
    );
  }

  if (!loadingEvents && !loadedEvents) {
    return (
      <Notification
        message="API: something went wrong with loading events"
        status="warning"
      />
    );
  }

  return null;
}

export default connect((state) => ({
  events: state.events.entities,
  loadingEvents: state.events.loading,
  loadedEvents: state.events.loaded,
  errorEvents: state.events.error,
}))(NotifyEventsStatus);
