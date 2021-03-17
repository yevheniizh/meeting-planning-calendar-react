/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import {
  DAYS,
  WORKING_DAY_TIMESLOTS_QUANTITY,
  WORKING_DAY_START,
} from '../../utils/constants';
import Notification from '../Notification';

function CreateEventForm({ users, onEventPost, setNewNotification }) {
  const setMembersChoosenByDefault = [...users].map((user) => ({
    ...user,
    isChoosen: false,
  }));

  const [eventData, setEventData] = useState({});
  const [isChoosenMembers, setIsChoosenMembers] = useState(
    setMembersChoosenByDefault
  );

  const setMembers = () =>
    setEventData({
      ...eventData,
      members: isChoosenMembers
        .filter(({ isChoosen }) => isChoosen === true)
        .map(({ id }) => ({ id })),
    });

  useEffect(() => {
    setMembers();
  }, [isChoosenMembers]);

  useEffect(() => {
    setEventData({ day: DAYS[0], time: `${WORKING_DAY_START}:00` });
  }, []);

  const membersDropdown = (
    <div className="create-event__form-input_multiselect">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="allMembersCheckbox"
          value="All members"
          onChange={(ev) => {
            const isChecked = ev.target.checked;

            if (isChecked) {
              return setIsChoosenMembers(
                [...isChoosenMembers].map((member) => ({
                  ...member,
                  isChoosen: true,
                }))
              );
            }

            return setIsChoosenMembers(
              [...isChoosenMembers].map((member) => ({
                ...member,
                isChoosen: false,
              }))
            );
          }}
        />
        <label className="form-check-label" htmlFor="allMembersCheckbox">
          All members
        </label>
      </div>

      {isChoosenMembers.map((user) => (
        <div key={user.id} className="form-check">
          <input
            className="form-check-input member"
            type="checkbox"
            data-userid={user.id}
            value={user.id}
            checked={user.isChoosen}
            onChange={(ev) => {
              setIsChoosenMembers(
                [...isChoosenMembers].map((member) => {
                  const userId = ev.target.getAttribute('data-userid');

                  if (member.id === userId) {
                    console.log(member.isChoosen);
                    return { ...member, isChoosen: !member.isChoosen };
                  }

                  return member;
                })
              );
            }}
          />
          <label className="form-check-label">{user.data.name}</label>
        </div>
      ))}
    </div>
  );

  const daysDropdown = (
    <div className="create-event__form-input">
      <select
        className="form-select form-select-lg"
        onChange={(event) =>
          setEventData({
            ...eventData,
            day: event.target.value,
          })
        }
      >
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
      <select
        className="form-select form-select-lg"
        onChange={(event) =>
          setEventData({
            ...eventData,
            time: event.target.value,
          })
        }
      >
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

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (
      eventData.name &&
      eventData.members &&
      eventData.members.length &&
      eventData.day &&
      eventData.time
    ) {
      const isTimeSlotEmpty = await onEventPost(eventData);

      if (isTimeSlotEmpty)
        setTimeout(() => {
          window.location.href = '/meeting-planning-calendar-react';
        }, 1000);
    } else {
      setNewNotification(
        <Notification message="Please, fill out all fields" status="warning" />
      );
    }
  };

  return (
    <div>
      <form className="create-event__form" onSubmit={handleSubmit}>
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
              onChange={(event) =>
                setEventData({
                  ...eventData,
                  name: event.target.value,
                })
              }
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
          <Link to="/meeting-planning-calendar-react">
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
