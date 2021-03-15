import React, { useState, useEffect, useContext, useCallback } from 'react';
import { userContext, UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import Calendar from '../Calendar/Calendar';
import LogInModal from '../Login-modal';

function App() {
  const getSessionUser = JSON.parse(sessionStorage.getItem('memberLoggedIn'));

  const { defaultSessionUser } = useContext(userContext);
  const [users, setUsers] = useState(null);
  const [events, setEvents] = useState(null);
  const [sessionUser, setSessionUser] = useState(getSessionUser);

  const onEventDelete = (eventId) => {
    fetch(
      `http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events/${eventId}`,
      {
        method: 'DELETE',
      }
    )
      .then(() => {
        console.log('Event deleted succesfully');
        const updatedEvents = events.filter((event) => event.id !== eventId);

        setEvents(updatedEvents);
      })
      .catch((error) => console.log(error));
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch(
        'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events'
      );
      const result = await response.json();

      if (result === null) {
        setEvents([]);
        return;
      }

      const data = result.map((item) => ({
        id: item.id,
        data: JSON.parse(item.data),
      }));

      setEvents(data);
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
        return;
      }

      const data = result.map((item) => ({
        id: item.id,
        data: JSON.parse(item.data),
      }));

      setUsers(data);
    } catch (error) {
      console.log(`${error}. Please try again`);
    }
  }, [defaultSessionUser, sessionUser]);

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, [fetchUsers, fetchEvents]);

  if (users === null) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <LogInModal users={users} />
      <Calendar users={users} events={events} onEventDelete={onEventDelete} />
    </UserProvider>
  );
}

export default App;
