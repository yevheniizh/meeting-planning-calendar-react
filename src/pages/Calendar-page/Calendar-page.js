/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { userContext } from '../../contexts/user-context';
import Calendar from '../../components/Calendar/Calendar';

function CalendarPage({ users }) {
  const { sessionUser, setSessionUser } = useContext(userContext);
  const [sessionUserName, setSessionUserName] = useState(users[0].data.name);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (!sessionUser) handleShowModal();
  }, [sessionUser]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Who are You?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="calendar__header_handling-dropdown">
            <select
              className="form-select form-select-lg"
              id="membersDropdownModal"
              onChange={(ev) => setSessionUserName(ev.target.value)}
            >
              {users.map((member) => (
                <option
                  key={member.id}
                  value={member.data.name}
                  data-rights={member.data.rights}
                >
                  {member.data.name} ({member.data.rights})
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModal();
              setSessionUser(() => {
                const user = users.find(
                  (member) => member.data.name === sessionUserName
                );

                sessionStorage.setItem(
                  'memberLoggedIn',
                  JSON.stringify(user.data)
                );

                return user;
              });
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Calendar />
    </>
  );
}

export default CalendarPage;
