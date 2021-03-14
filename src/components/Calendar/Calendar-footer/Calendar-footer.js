import React, { useContext } from 'react';
import { userContext } from '../../../contexts/user-context';

function CalendarFooter() {
  const { setSessionUser } = useContext(userContext);
  const getSessionUser = JSON.parse(sessionStorage.getItem('memberLoggedIn'));

  if (getSessionUser) {
    return (
      <div className="calendar__footer">
        <div>
          You are logged in as {getSessionUser.data.name} (
          {getSessionUser.data.rights})
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          id="logOutButton"
          onClick={() => {
            sessionStorage.clear();
            setSessionUser(null);
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return <div />;
  // return (
  //   <div className="calendar__footer">
  //     <div>
  //       You are logged in as {getSessionUser.data.name} (
  //       {getSessionUser.data.rights})
  //     </div>
  //   </div>
  // );
}

export default CalendarFooter;
