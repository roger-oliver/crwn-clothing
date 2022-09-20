import { USER_ACTION_TYPES } from "./user.types";

// add the reducer initial state;
const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// create the userReducer
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
    case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILURE:
    case USER_ACTION_TYPES.SIGN_UP_FAILURE:
      return {
        ...state,
        ...payload,
        isLoading: false,
      }
    default:
      return state;
  }
};
