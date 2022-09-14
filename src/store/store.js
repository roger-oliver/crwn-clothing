import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from '@redux-saga/core';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

const { REACT_APP_ENVIRONMENT } = process.env;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [logger, sagaMiddleware];

const composedEnhancers =
  REACT_APP_ENVIRONMENT === 'development'
    ? compose(applyMiddleware(...middlewares))
    : undefined;

export const store = createStore(rootReducer, undefined, composedEnhancers);
    
sagaMiddleware.run(rootSaga);