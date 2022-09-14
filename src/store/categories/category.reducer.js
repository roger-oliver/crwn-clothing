import { CATEGORIES_ACTION_TYPES } from "./category.types";

const INITIAL_STATTE = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (state = INITIAL_STATTE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...payload,
        isLoading: false,
      }
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        ...payload,
        isLoading: false,
      }
  
    default:
      return state;
  }
};