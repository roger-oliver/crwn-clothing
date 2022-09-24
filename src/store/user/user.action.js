import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_ACTION_TYPES } from './user.types';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, { currentUser: user });

export const checkUserSection = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailAndPasswordSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, { currentUser: user });

export const signInFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, { error });

export const signUpStart = (displayName, email, password) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    displayName,
    email,
    password,
  });

export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {
    currentUser: { ...user, ...additionalDetails },
  });

export const signUpFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, { error });

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS, { currentUser: null });

export const signOutFailure = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)