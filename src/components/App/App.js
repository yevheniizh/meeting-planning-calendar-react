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
// import Notification from '../Notification';

function App({
  loadUsers,
  loadingUsers,
  loadedUsers,
  loadEvents,
  loadingEvents,
  loadedEvents,
}) {
  // const [events, setEvents] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  // const [newNotification, setNewNotification] = useState();

  // const fetchEvents = useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/eents'
  //     );
  //     const result = await response.json();

  //     if (result === null) {
  //       setEvents();

  //       setNewNotification(
  //         <Notification
  //           message="API: events downloaded successfully, but... no data yet"
  //           status="successful"
  //         />
  //       );
  //       return;
  //     }

  //     if (response.ok) {
  //       const data = result.map((item) => ({
  //         id: item.id,
  //         data: JSON.parse(item.data),
  //       }));

  //       setEvents(data);
  //       setNewNotification(
  //         <Notification
  //           message="API: events downloaded successfully"
  //           status="successful"
  //         />
  //       );
  //       return;
  //     }

  //     setNewNotification(
  //       <Notification message="API: something went wrong" status="warning" />
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // const fetchUsers = useCallback(async () => {
  //   try {
  //     const response = await fetch(
  //       'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users'
  //     );
  //     const result = await response.json();

  //     if (result === null) {
  //       if (sessionUser === null) setSessionUser(defaultSessionUser);

  //       setUsers(noMembersMock);
  //       setNewNotification(
  //         <Notification
  //           message="API: users downloaded successfully, but... no data yet"
  //           status="successful"
  //         />
  //       );
  //       return;
  //     }

  //     if (response.ok) {
  //       const data = result.map((item) => ({
  //         id: item.id,
  //         data: JSON.parse(item.data),
  //       }));

  //       setUsers(data);
  //       setNewNotification(
  //         <Notification
  //           message="API: users downloaded successfully"
  //           status="successful"
  //         />
  //       );
  //       return;
  //     }

  //     setNewNotification(
  //       <Notification message="API: something went wrong" status="warning" />
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    loadUsers();
    if (!loadingEvents && !loadedEvents) {
      loadEvents();
    }
  }, [loadUsers, loadEvents]);

  if (loadingUsers && !loadedUsers) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <Switch>
        <Redirect exact from="/" to="/meeting-planning-calendar-react" />
        <Route path="/meeting-planning-calendar-react">
          <CalendarPage
          // newNotification={newNotification}
          />
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
