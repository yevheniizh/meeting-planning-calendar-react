import {
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_EVENTS,
  POST_EVENT,
  DELETE_EVENT,
} from '../constants';

const initialState = {
  entities: [],
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, deletingEventId, error } = action;

  switch (type) {
    case LOAD_EVENTS + REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case LOAD_EVENTS + SUCCESS:
      return {
        ...state,
        entities: data,
        loading: false,
        loaded: true,
      };
    case LOAD_EVENTS + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    case POST_EVENT:
      return {
        ...state,
      };

    case DELETE_EVENT:
      return {
        ...state,
        entities: [
          ...state.entities.filter((event) => event.id !== deletingEventId),
        ],
      };

    default:
      return state;
  }
};
