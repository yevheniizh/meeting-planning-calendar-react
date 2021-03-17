import { REQUEST, SUCCESS, FAILURE, LOAD_EVENTS } from '../constants';

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

    default:
      return state;
  }
};
