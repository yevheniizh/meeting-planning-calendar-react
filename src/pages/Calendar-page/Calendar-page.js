import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import LogInModal from '../../components/Login-modal';
// import Calendar from '../../components/Calendar/Calendar';

function CalendarPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users')
      .then((response) => response.json())
      .then((data) => {
        const dataResult = data.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));

        setUsers(dataResult);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (users) {
      const myModal = new Modal(document.querySelector('#staticBackdrop'), {});

      myModal.show();
    }
  }, [users]);

  if (users === null) {
    return <div />;
  }

  return <LogInModal users={users} />;
}

export default CalendarPage;
