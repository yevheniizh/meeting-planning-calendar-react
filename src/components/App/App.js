/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom';
import { UserProvider } from '../../contexts/user-context';
import CalendarPage from '../../pages/Calendar-page';
import ErrorPage from '../../pages/error404/Error-page';
import { loadUsers, loadEvents } from '../../redux/actions';

function App({ loadUsers, loadingUsers, loadedUsers, loadEvents }) {
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    loadUsers();
    loadEvents();
  }, [loadUsers, loadEvents]);

  if (loadingUsers && !loadedUsers) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <Switch>
        <Redirect exact from="/" to="/meeting-planning-calendar-react" />
        <Route path="/meeting-planning-calendar-react">
          <CalendarPage />
        </Route>

        <Route path="/error" component={ErrorPage} />
      </Switch>
    </UserProvider>
  );
}

export default connect(
  (state) => ({
    loadingUsers: state.users.loading,
    loadedUsers: state.users.loaded,
    loadingEvents: state.events.loading,
    loadedEvents: state.events.loaded,
  }),
  { loadUsers, loadEvents }
)(App);
