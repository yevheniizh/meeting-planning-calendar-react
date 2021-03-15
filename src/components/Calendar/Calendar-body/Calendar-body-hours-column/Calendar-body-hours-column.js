import React from 'react';

import {
  WORKING_DAY_START,
  WORKING_DAY_TIMESLOTS_QUANTITY,
} from '../../../../utils/constants';

function CalendarBodyHoursColumn() {
  return (
    <>
      {[...Array(WORKING_DAY_TIMESLOTS_QUANTITY)].map((_, i) => {
        const timeSlot = `${i + WORKING_DAY_START}:00`;

        return <li key={timeSlot}>{timeSlot}</li>;
      })}
    </>
  );
}

export default CalendarBodyHoursColumn;
