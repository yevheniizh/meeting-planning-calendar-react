import React, { useState } from 'react';
import { UserProvider } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';
import CalendarPage from '../../pages/Calendar-page';

function App() {
  const [guest] = noMembersMock;
  const [user, setUser] = useState(guest);

  return (
    <UserProvider value={{ user, setUser }}>
      <CalendarPage />
    </UserProvider>
  );
}

export default App;
