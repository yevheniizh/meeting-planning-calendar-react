import {
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_EVENTS,
  POST_EVENT,
} from '../constants';

const initialState = {
  entities: [],
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOAD_EVENTS + REQUEST:
      return {
        ...state,
        loading: true,
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

    case POST_EVENT + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_EVENT + SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case POST_EVENT + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };

    default:
      return state;
  }
};
