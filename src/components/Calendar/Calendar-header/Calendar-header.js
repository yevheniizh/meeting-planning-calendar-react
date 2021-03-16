/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function CalendarHeader({ users }) {
  return (
    <div className="calendar__header">
      <div>
        <h1>Calendar</h1>
      </div>
      <div className="calendar__header_handling">
        <div className="calendar__header_handling-dropdown">
          <select className="form-select form-select-lg" id="membersDropdown">
            <option value="All members">All members</option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.data.name}
                data-rights={user.data.rights}
              >
                {user.data.name} ({user.data.rights})
              </option>
            ))}
          </select>
        </div>
        <div className="calendar__header_handling-newEventCreatingButton">
          <Link to="/meeting-planning-calendar-react/create-event">
            <button
              type="submit"
              name="newEvent"
              className="btn btn-outline-dark"
            >
              New event +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
