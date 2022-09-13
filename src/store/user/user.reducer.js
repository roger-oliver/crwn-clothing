import { USER_ACTION_TYPES } from "./user.types";

// add the reducer initial state;
const INITIAL_STATE = {
  currentUser: null,
};

// create the userReducer
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
