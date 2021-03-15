import React, { useState, useEffect, useContext } from 'react';
import { userContext, UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import CalendarPage from '../../pages/Calendar-page';

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

  useEffect(() => {
    fetch('http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users')
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          if (sessionUser === null) setSessionUser(defaultSessionUser);
          setUsers(noMembersMock);
          return;
        }

        const result = data.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setUsers(result);
      })
      .catch((error) => console.log(error));

    fetch('http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events')
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          setEvents([]);
          return;
        }

        const result = data.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setEvents(result);
      })
      .catch((error) => console.log(error));
  }, [sessionUser, defaultSessionUser]);

  if (users === null) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <CalendarPage
        users={users}
        events={events}
        onEventDelete={onEventDelete}
      />
    </UserProvider>
  );
}

export default App;
