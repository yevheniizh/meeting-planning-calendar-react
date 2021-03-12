import React from 'react';

function CalendarTableHoursColumn() {
  return (
    <>
      {[...Array(9)].map((_, i) => (
        <li key={`${i + 10}:00`}>{i + 10}:00</li>
      ))}
    </>
  );
}

export default CalendarTableHoursColumn;
