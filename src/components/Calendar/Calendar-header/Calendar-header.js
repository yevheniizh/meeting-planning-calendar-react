import React from 'react';

function CalendarHeader() {
  return (
    <div className="calendar__header">
      <div>
        <h1>Calendar</h1>
      </div>
      <div className="calendar__header_handling">
        <div className="calendar__header_handling-dropdown">
          <select className="form-select form-select-lg" id="membersDropdown">
            <option value="All members">All members</option>
          </select>
        </div>
        <div className="calendar__header_handling-newEventCreatingButton">
          <button
            type="submit"
            name="newEvent"
            className="btn btn-outline-dark"
          >
            New event +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarHeader;
