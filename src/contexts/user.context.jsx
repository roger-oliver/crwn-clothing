import { createContext, useEffect, useReducer } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// create the user action types
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

// create the userReducer
const userReducer = (state, action) => {
  console.log('----> userReducer - DISPATCHED');
  console.log('---->', action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error({
        message: `the type ${type} is not expected in "userReducer"`,
      });
  }
};

// add the reducer initial state;
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;
  console.log('---->', currentUser);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    async function subscribe() {
      const unsubscribe = onAuthStateChangedListener(async (user) => {
        if (user) {
          await createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
      });
      return unsubscribe;
    }
    // TODO: should return unsubscribed (when completed), but returning an error
    subscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
