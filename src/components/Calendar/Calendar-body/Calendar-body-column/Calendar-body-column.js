/* eslint-disable react/prop-types */
import React from 'react';
import Event from '../../Event';

import {
  WORKING_DAY_START,
  WORKING_DAY_TIMESLOTS_QUANTITY,
} from '../../../../utils/constants';

function CalendarBodyColumn({ day, events, onEventDelete }) {
  if (events) {
    const filteredByDayEventsData = [...events].filter(
      (event) => event.data.day === day
    );

    return (
      <>
        {[...Array(WORKING_DAY_TIMESLOTS_QUANTITY)].map((_, i) => {
          const timeSlot = `${i + WORKING_DAY_START}:00`;

          if (
            filteredByDayEventsData.some(
              (event) => event.data.time === timeSlot
            )
          ) {
            return (
              <li
                key={`${day} ${timeSlot}`}
                data-time={timeSlot}
                data-day={day}
              >
                <Event
                  event={filteredByDayEventsData.find(
                    (event) => event.data.time === timeSlot
                  )}
                  onEventDelete={onEventDelete}
                />
              </li>
            );
          }

          return (
            <li
              key={`${day} ${timeSlot}`}
              data-time={timeSlot}
              data-day={day}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {[...Array(WORKING_DAY_TIMESLOTS_QUANTITY)].map((_, i) => {
        const timeSlot = `${i + WORKING_DAY_START}:00`;

        return (
          <li
            key={`${day} ${timeSlot}`}
            data-time={`${timeSlot}`}
            data-day={day}
          />
        );
      })}
    </>
  );
}

export default CalendarBodyColumn;
