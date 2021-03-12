/* eslint-disable react/prop-types */
import React from 'react';
import { noMembersMock } from '../../fixtures-members';

function LogInModal({ users = noMembersMock }) {
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              id="submitRoleButton"
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
