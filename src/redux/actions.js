import { noMembersMock } from '../fixtures-members';
import {
  LOAD_EVENTS,
  LOAD_USERS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './constants';

export const loadEvents = () => async (dispatch) => {
  dispatch({ type: LOAD_EVENTS + REQUEST });
  try {
    const data = await fetch(
      'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events'
    )
      .then((res) => res.json())
      .then((events) => {
        if (events === null) {
          return [];
        }

        return events.map((item) => ({
          id: item.id,
          data: JSON.parse(item.data),
        }));
      });
    dispatch({ type: LOAD_EVENTS + SUCCESS, data });
  } catch (error) {
    dispatch({ type: LOAD_EVENTS + FAILURE, error });
  }
};

export const loadUsers = () => async (dispatch) => {
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
