import React from 'react';

// eslint-disable-next-line react/prop-types
function CalendarTableColumn({ day }) {
  return (
    <>
      {[...Array(9)].map((_, i) => (
        <li
          key={`day ${i + 10}:00`}
          data-time={`${i + 10}:00`}
          data-day={day}
        />
      ))}
    </>
  );
}

export default CalendarTableColumn;
