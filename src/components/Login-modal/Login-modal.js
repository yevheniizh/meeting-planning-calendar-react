/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { userContext } from '../../contexts/user-context';
import { noMembersMock } from '../../fixtures-members';

function LogInModal({ users = noMembersMock }) {
  const { setSessionUser } = useContext(userContext);
  const [name, setName] = useState(users[0].data.name);

  return (
    <div className="modal fade modal-dialog" id="staticBackdrop">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Who are You?</h5>
          </div>
          <div className="modal-body">
            <div className="calendar__header_handling-dropdown">
              <select
                className="form-select form-select-lg"
                id="membersDropdownModal"
                onChange={(ev) => setName(ev.target.value)}
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              id="submitRoleButton"
              onClick={() =>
                setSessionUser(() =>
                  users.find((member) => member.data.name === name)
                )
              }
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInModal;
