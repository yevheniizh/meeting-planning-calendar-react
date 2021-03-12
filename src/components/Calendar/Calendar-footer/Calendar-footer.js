import React from 'react';

function CalendarFooter() {
  return (
    <div className="calendar__footer">
      <div>You are logged in as guest (user)</div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        id="logOutButton"
      >
        Log out
      </button>
    </div>
  );
}

export default CalendarFooter;
