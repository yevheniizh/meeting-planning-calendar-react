import React, { useContext } from 'react';
import { userContext } from '../../../contexts/user-context';

function CalendarFooter() {
  const { sessionUser, setSessionUser } = useContext(userContext);

  if (sessionUser) {
    return (
      <div className="calendar__footer">
        <div>
          You are logged in as {sessionUser.data.name} (
          {sessionUser.data.rights})
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="logOutButton"
          onClick={() => {
            setSessionUser(null);
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return <div />;
}

export default CalendarFooter;
