import { CATEGORIES_ACTION_TYPES } from "./category.types";

const INITIAL_STATTE = {
  categories: [],
};

export const categoryReducer = (state = INITIAL_STATTE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        ...payload,
      }
  
    default:
      return state;
  }
};