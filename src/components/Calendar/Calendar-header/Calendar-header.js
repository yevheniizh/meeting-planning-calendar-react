/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userContext } from '../../../contexts/user-context';

function CalendarHeader({ users, setSortingBy }) {
  const { sessionUser } = useContext(userContext);

  const getNewEventButton = () => {
    if (sessionUser && sessionUser.data.rights === 'admin') {
      return (
        <Link to="/meeting-planning-calendar-react/create-event">
          <button
            type="submit"
            name="newEvent"
            className="btn btn-outline-dark"
          >
            New event +
          </button>
        </Link>
      );
    }

    return (
      <button
        type="submit"
        name="newEvent"
        className="btn btn-outline-dark disabled"
      >
        New event +
      </button>
    );
  };

  const [newEventButton, setNewEventButton] = useState(getNewEventButton());

  useEffect(() => {
    setNewEventButton(getNewEventButton());
  }, [sessionUser]);

  return (
    <div className="calendar__header">
      <div>
        <h1>Calendar</h1>
      </div>
      <div className="calendar__header_handling">
        <div className="calendar__header_handling-dropdown">
          <select
            className="form-select form-select-lg"
            id="membersDropdown"
            onChange={(ev) => {
              const userid = ev.target[ev.target.selectedIndex].getAttribute(
                'data-userid'
              );

              setSortingBy(userid);
            }}
          >
            <option value="All members" data-userid="All members">
              All members
            </option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.data.name}
                data-userid={user.id}
                data-rights={user.data.rights}
              >
                {user.data.name} ({user.data.rights})
              </option>
            ))}
          </select>
        </div>
        <div className="calendar__header_handling-newEventCreatingButton">
          {newEventButton}
        </div>
      </div>
    </div>
  );
}

export default connect((state) => ({
  users: state.users.entities,
}))(CalendarHeader);
