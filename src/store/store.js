import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const {
  REACT_APP_ENVIRONMENT,
} = process.env;

const middlewares = [
  logger
];

const composedEnhancers = REACT_APP_ENVIRONMENT === 'development' ? compose(applyMiddleware(...middlewares)) : undefined;


export const store = createStore(rootReducer, undefined, composedEnhancers);