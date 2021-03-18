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

const BACKEND_URL = 'http://158.101.166.74:8080/api/data';
const SYSTEM = 'yevhenii_zhyrov';
const ENTITY_EVENTS = 'events';
const ENTITY_USERS = 'users';

export const loadEvents = () => async (dispatch) => {
  dispatch({ type: LOAD_EVENTS + REQUEST });
  try {
    const data = await fetch(`${BACKEND_URL}/${SYSTEM}/${ENTITY_EVENTS}`)
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
    //     const response = await fetch(
    //       'http://158.101.166.74:8080/api/data/yevhenii_zhyrov/users'
    //     );
    //     const result = await response.json();

    //     if (result === null) {
    //       if (sessionUser === null) setSessionUser(defaultSessionUser);

    //       setUsers(noMembersMock);
    //       setNewNotification(
    //         <Notification
    //           message="API: users downloaded successfully, but... no data yet"
    //           status="successful"
    //         />
    //       );
    //       return;
    //     }

    //     if (response.ok) {
    //       const data = result.map((item) => ({
    //         id: item.id,
    //         data: JSON.parse(item.data),
    //       }));

    //       setUsers(data);
    //       setNewNotification(
    //         <Notification
    //           message="API: users downloaded successfully"
    //           status="successful"
    //         />
    //       );
    //       return;
    //     }

    //     setNewNotification(
    //       <Notification message="API: something went wrong" status="warning" />
    //     );

    const response = await fetch(`${BACKEND_URL}/${SYSTEM}/${ENTITY_USERS}`);
    const result = await response.json();

    if (result === null) {
      const data = noMembersMock;

      dispatch({ type: LOAD_USERS + SUCCESS, data });

      return data;
    }

    const data = result.map((item) => ({
      id: item.id,
      data: JSON.parse(item.data),
    }));

    dispatch({ type: LOAD_USERS + SUCCESS, data });

    return data;
  } catch (error) {
    const data = noMembersMock;

    dispatch({ type: LOAD_USERS + FAILURE, error });

    return data;
  }
};

export const postEvent = (eventData) => async (dispatch) => {
  dispatch({ type: POST_EVENT + REQUEST });
  try {
    const isEventPosted = await fetch(
      `${BACKEND_URL}/${SYSTEM}/${ENTITY_EVENTS}`,
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
      `${BACKEND_URL}/${SYSTEM}/${ENTITY_EVENTS}/${deletingEventId}`,
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
