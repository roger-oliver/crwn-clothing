import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  returnErrorMessageFromCode,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';
import { signInFailure, signInSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

function* getSnapshotFromUserAuth(userAuthenticated, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuthenticated,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* isUserSessionActive() {
  try {
    const userAuthenticated = yield call(getCurrentUser);
    if (!userAuthenticated) return;
    yield call(getSnapshotFromUserAuth, userAuthenticated);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signInWithEmailAndPassword(action) {
  const {
    payload: { email, password },
  } = action;
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    let message = returnErrorMessageFromCode(error.code.toLocaleLowerCase());
    yield put(signInFailure(message || error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserSessionActive);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailAndPasswordSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailAndPasswordSignInStart),
  ]);
}
