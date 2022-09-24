import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  returnErrorMessageFromCode,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from '../../utils/firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.action';
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

function* signUp(action) {
  const {
    payload: { displayName, email, password }
  } = action;
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user, { displayName });
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
};

function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
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

function* onSignUpStart() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_UP_START, signUp
  );
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailAndPasswordSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
