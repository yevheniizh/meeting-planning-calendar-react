import { noMembersMock } from '../fixtures-members';
import {
  LOAD_EVENTS,
  LOAD_USERS,
  POST_EVENT,
  DELETE_EVENT,
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

export const postEvent = (eventData) => async (dispatch) => {
  dispatch({ type: POST_EVENT + REQUEST });
  try {
    const isEventPosted = await fetch(
      'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          data: JSON.stringify(eventData),
        }),
      }
    ).then((res) => {
      if (res.ok) {
        return true;
      }

      return false;
    });
    dispatch({ type: POST_EVENT + SUCCESS });

    return isEventPosted;
  } catch (error) {
    dispatch({ type: POST_EVENT + FAILURE, error });

    return false;
  }
};

export const deleteEvent = (deletingEventId) => async (dispatch) => {
  dispatch({ type: DELETE_EVENT + REQUEST });
  try {
    const isEventDeleted = await fetch(
      `http://158.101.166.74:8080/api/data/yevhenii_zhyrov/events/${deletingEventId}`,
      {
        method: 'DELETE',
      }
    ).then((res) => {
      if (res.ok) {
        return true;
      }

      return false;
    });

    dispatch({ type: DELETE_EVENT + SUCCESS, deletingEventId });

    return isEventDeleted;
  } catch (error) {
    dispatch({ type: DELETE_EVENT + FAILURE, error });

    return false;
  }
};
