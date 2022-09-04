import { createContext, useEffect, useReducer } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const CATETORIES_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
}

const INITIAL_STATE = {
  categoriesMap: {}
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATETORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        ...payload,
      }      
  
    default:
      throw new Error({
        message: `the type ${type} is not expected in "categoriesReducer"`,
      })
  }
}

export const CategoriesProvider = ({ children }) => {
  
  const [ state, dispatch ] = useReducer(categoriesReducer, INITIAL_STATE);
  const { categoriesMap } = state;

  const setCategoriesMap = (categoriesMap) => {
    dispatch({ type: CATETORIES_ACTION_TYPES.SET_CATEGORIES, payload: { categoriesMap }});
  }

  useEffect(() => {
    const getCategoriesAndItems = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    getCategoriesAndItems();
  }, []);
  
  const value = { categoriesMap };

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}