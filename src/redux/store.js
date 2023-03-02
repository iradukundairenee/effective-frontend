import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import promise from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import { errorHandler } from "./utils";

const userInfo = localStorage.getItem("userInfo");
const initialState = {
  login: { userInfo: userInfo ? JSON.parse(userInfo) : { user: {} } },
};

const configureStore = (preloadedState = initialState) => {
  // const isDev = process.env.NODE_ENV === "development";
  const middlewares = [errorHandler, thunkMiddleware, promise]; // loggerMiddleware

  // const middlewareEnhancer = isDev
  // 	? composeWithDevTools(applyMiddleware(...middlewares))
  // 	: applyMiddleware(...middlewares);
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
};
export const store = configureStore();
