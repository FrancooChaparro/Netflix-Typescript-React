import { createStore, applyMiddleware, compose, Store } from "redux";
import rootReducer from "./reducer";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware as ThunkMiddleware))
);

export default store;
