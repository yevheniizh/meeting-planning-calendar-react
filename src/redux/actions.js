import { noMembersMock } from '../fixtures-members';
import { LOAD_USERS, REQUEST, SUCCESS, FAILURE } from './constants';

const loadUsers = () => async (dispatch) => {
  dispatch({ type: LOAD_USERS + REQUEST });
  try {
    const data = await fetch(
      'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users'
    )
      .then((res) => res.json())
      .then((users) => {
        if (users === null) {
          return noMembersMock;
        }

        return users.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));
      });
    dispatch({ type: LOAD_USERS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_USERS + FAILURE, error });
  }
};

export default loadUsers;
