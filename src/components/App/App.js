import React, { useState, useEffect, useContext } from 'react';
import { userContext, UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import CalendarPage from '../../pages/Calendar-page';

function App() {
  const { defaultSessionUser } = useContext(userContext);
  const [users, setUsers] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    fetch('http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users')
      .then((response) => response.json())
      .then((data) => {
        if (data === null) {
          setSessionUser(defaultSessionUser);
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
  }, [defaultSessionUser]);

  if (users === null) {
    return <div />;
  }

  return (
    <UserProvider value={{ sessionUser, setSessionUser }}>
      <CalendarPage users={users} />
    </UserProvider>
  );
}

export default App;
