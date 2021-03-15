/* eslint-disable react/prop-types */
import React from 'react';
import Event from '../../Event';

function CalendarTableColumn({ day, events, onEventDelete }) {
  if (events) {
    const filteredEventsData = [...events].filter(
      (event) => event.data.day === day
    );

    return (
      <>
        {[...Array(9)].map((_, i) => {
          const timeSlot = `${i + 10}:00`;

          if (
            filteredEventsData.some((event) => event.data.time === timeSlot)
          ) {
            return (
              <li
                key={`${day} ${i + 10}:00`}
                data-time={`${i + 10}:00`}
                data-day={day}
              >
                <Event
                  event={filteredEventsData.find(
                    (event) => event.data.time === timeSlot
                  )}
                  onEventDelete={onEventDelete}
                />
              </li>
            );
          }

          return (
            <li
              key={`${day} ${i + 10}:00`}
              data-time={`${i + 10}:00`}
              data-day={day}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {[...Array(9)].map((_, i) => (
        <li
          key={`${day} ${i + 10}:00`}
          data-time={`${i + 10}:00`}
          data-day={day}
        />
      ))}
    </>
  );
}

export default CalendarTableColumn;
