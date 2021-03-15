/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import {
  DAYS,
  WORKING_DAY_TIMESLOTS_QUANTITY,
  WORKING_DAY_START,
} from '../../utils/constants';

function CreateEventForm({ users }) {
  const membersDropdown = (
    <div>
      <div className="create-event__form-input_multiselect">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="allMembersCheckbox"
            value="All members"
          />
          <label className="form-check-label" htmlFor="allMembersCheckbox">
            All members
          </label>
        </div>

        {users.map((user) => (
          <div key={user.id} className="form-check">
            <input
              className="form-check-input member"
              type="checkbox"
              data-member={user.id}
              value={user.id}
            />
            <label className="form-check-label">{user.data.name}</label>
          </div>
        ))}
      </div>
    </div>
  );

  const daysDropdown = (
    <div className="create-event__form-input">
      <select className="form-select form-select-lg">
        {DAYS.map((day) => (
          <option key={day} data-day={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );

  const hoursDropdown = (
    <div className="create-event__form-input">
      <select className="form-select form-select-lg">
        {[...Array(WORKING_DAY_TIMESLOTS_QUANTITY)].map((_, i) => {
          const timeSlot = `${i + WORKING_DAY_START}:00`;

          return (
            <option data-time={timeSlot} key={timeSlot}>
              {timeSlot}
            </option>
          );
        })}
      </select>
    </div>
  );

  return (
    <div>
      <form className="create-event__form">
        <div className="create-event__form-element">
          <div className="create-event__form-description">
            Name of the event
          </div>
          <div className="create-event__form-input">
            <input
              placeholder="Type here"
              type="search"
              className="form-control"
              data-name="name"
            />
          </div>
        </div>

        <div className="create-event__form-element">
          <div className="create-event__form-description">Participants</div>
          {membersDropdown}
        </div>

        <div className="create-event__form-element">
          <div className="create-event__form-description">Day</div>
          {daysDropdown}
        </div>

        <div className="create-event__form-element">
          <div className="create-event__form-description">Time</div>
          {hoursDropdown}
        </div>

        <div className="create-event__form-element">
          <button
            type="submit"
            className="btn btn-outline-dark create-event__button_create"
          >
            Create
          </button>
        </div>

        <div className="create-event__form-element">
          <Link to="/">
            <button
              type="button"
              className="btn btn-outline-dark create-event__button_cancel"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default CreateEventForm;
