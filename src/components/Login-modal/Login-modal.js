/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';

import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { userContext } from '../../contexts/user-context';

function LogInModal({ users, loadingUsers, loadedUsers }) {
  const { sessionUser, setSessionUser } = useContext(userContext);
  const [sessionUserName, setSessionUserName] = useState(null);

  const [showModal, setShowModal] = useState(null);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    if (!sessionUser) {
      handleShowModal();
      if (!loadingUsers && loadedUsers) {
        setSessionUserName(users[0].data.name);
      }
    }
  }, [sessionUser]);

  const onSubmitSessionUser = () => {
    handleCloseModal();

    if (!sessionUserName) {
      return setSessionUser(users[0]);
    }

    return setSessionUser(() =>
      users.find((user) => user.data.name === sessionUserName)
    );
  };

  return (
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
            {users.map((user) => (
              <option
                key={user.id}
                value={user.data.name}
                data-rights={user.data.rights}
              >
                {user.data.name} ({user.data.rights})
              </option>
            ))}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onSubmitSessionUser}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect((state) => ({
  users: state.users.entities,
  loadingUsers: state.users.loading,
  loadedUsers: state.users.loaded,
}))(LogInModal);
