/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { userContext, UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import CalendarPage from '../../pages/Calendar-page';
import ErrorPage from '../../pages/error404/Error-page';
import Notification from '../Notification';

function App() {
  const { defaultSessionUser } = useContext(userContext);
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [newNotification, setNewNotification] = useState();

  const onEventDelete = async (eventId) => {
    try {
      const response = await fetch(
        `http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events/${eventId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        const updatedEvents = events.filter((event) => event.id !== eventId);

        setEvents(updatedEvents);
        setNewNotification(
          <Notification
            message="API: event deleted successfully"
            status="successful"
          />
        );
        return;
      }

      setNewNotification(
        <Notification message="API: something went wrong" status="warning" />
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onEventPost = async (eventData) => {
    if (
      events.some(
        ({ data }) => data.day === eventData.day && data.time === eventData.time
      )
    ) {
      setNewNotification(
        <Notification
          message="API: This time slot is already occupied. Please choose another day or time"
          status="warning"
        />
      );
      return false;
    }

    try {
      const response = await fetch(
        'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            data: JSON.stringify(eventData),
          }),
        }
      );

      if (response.ok) {
        setNewNotification(
          <Notification
            message="API: event posted successfully"
            status="successful"
          />
        );
        return true;
      }

      setNewNotification(
        <Notification message="API: something went wrong" status="warning" />
      );
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(
        'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events'
      );
      const result = await response.json();

      if (result === null) {
        setEvents([]);

        setNewNotification(
          <Notification
            message="API: events downloaded successfully, but... no data yet"
            status="successful"
          />
        );
        return;
      }

      if (response.ok) {
        const data = result.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setEvents(data);
        setNewNotification(
          <Notification
            message="API: events downloaded successfully"
            status="successful"
          />
        );
        return;
      }

      setNewNotification(
        <Notification message="API: something went wrong" status="warning" />
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users'
      );
      const result = await response.json();

      if (result === null) {
        if (sessionUser === null) setSessionUser(defaultSessionUser);

        setUsers(noMembersMock);
        setNewNotification(
          <Notification
            message="API: users downloaded successfully, but... no data yet"
            status="successful"
          />
        );
        return;
      }

      if (response.ok) {
        const data = result.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setUsers(data);
        setNewNotification(
          <Notification
            message="API: users downloaded successfully"
            status="successful"
          />
        );
        return;
      }

      setNewNotification(
        <Notification message="API: something went wrong" status="warning" />
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, [fetchUsers, fetchEvents]);

  if (users === null) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <Switch>
        <Redirect exact from="/" to="/meeting-planning-calendar-react" />
        <Route path="/meeting-planning-calendar-react">
          <CalendarPage
            users={users}
            events={events}
            onEventDelete={onEventDelete}
            onEventPost={onEventPost}
            newNotification={newNotification}
          />
        </Route>

        <Route path="/error" component={ErrorPage} />
      </Switch>
    </UserProvider>
  );
}

export default App;
