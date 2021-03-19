/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

import Notification from './Notification';

function NotifyUsersStatus({ users, loadingUsers, loadedUsers, errorUsers }) {
  // USERS NOTIFICATIONS

  if (!loadingUsers && loadedUsers) {
    // check if users downloaded, but no data
    if (users[0].data.name === 'guest') {
      return (
        <Notification
          message="API: users downloaded successfully, but... no data yet"
          status="successful"
        />
      );
    }

    return (
      <Notification
        message="API: users downloaded successfully"
        status="successful"
      />
    );
  }

  if (errorUsers) {
    return (
      <Notification message="API: error with loading users" status="error" />
    );
  }

  if (!loadingUsers && !loadedUsers) {
    return (
      <Notification
        message="API: something went wrong with loading users"
        status="warning"
      />
    );
  }

  return null;
}

export default connect((state) => ({
  users: state.users.entities,
  loadingUsers: state.users.loading,
  loadedUsers: state.users.loaded,
  errorUsers: state.users.error,
}))(NotifyUsersStatus);
