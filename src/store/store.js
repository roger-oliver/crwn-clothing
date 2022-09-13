import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./root-reducer";

const {
  REACT_APP_ENVIRONMENT,
} = process.env;

const middlewares = [
  logger, thunk,
];

const composedEnhancers = REACT_APP_ENVIRONMENT === 'development' ? compose(applyMiddleware(...middlewares)) : undefined;


export const store = createStore(rootReducer, undefined, composedEnhancers);