/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext, useCallback } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { userContext, UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import CalendarPage from '../../pages/Calendar-page';
import ErrorPage from '../../pages/error404/Error-page';

function App() {
  const getSessionUser = JSON.parse(sessionStorage.getItem('memberLoggedIn'));

  const { defaultSessionUser } = useContext(userContext);
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [sessionUser, setSessionUser] = useState(getSessionUser);

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

        console.log(`API: event deleted succesfully`);
        return;
      }

      console.log(`API: something went wrong`);
    } catch (error) {
      console.log(`${error}. Please try again`);
    }
  };

  const onEventPost = async (eventData) => {
    if (
      events.some(
        ({ data }) => data.day === eventData.day && data.time === eventData.time
      )
    ) {
      console.log(
        'API: This time slot is already occupied. Please choose another day or time'
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
      const isResponseOk = response.ok;

      if (isResponseOk) {
        console.log(`API: event posted succesfully`);
        return isResponseOk;
      }

      console.log(`API: something went wrong`);
      return isResponseOk;
    } catch (error) {
      console.log(`${error}. Please try again`);
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

        console.log('API: events downloaded succesfully');
        console.log('API: no data');
        return;
      }

      if (response.ok) {
        const data = result.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setEvents(data);

        console.log('API: events downloaded succesfully');
        return;
      }

      console.log(`API: something went wrong`);
    } catch (error) {
      console.log(`${error}. Please try again`);
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

        console.log('API: users downloaded succesfully');
        console.log('API: no users');
        return;
      }

      if (response.ok) {
        const data = result.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setUsers(data);

        console.log(`API: users downloaded succesfully`);
        return;
      }

      console.log(`API: something went wrong`);
    } catch (error) {
      console.log(`${error}. Please try again`);
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
          />
        </Route>

        <Route path="/error" component={ErrorPage} />
      </Switch>
    </UserProvider>
  );
}

export default App;
